import React, { useContext } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import useStyles from '../../util/useStyles'
import { UserContext } from '../../root/UserProvider'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'
import FeedBookSlider from '../../components/FeedBook/FeedBookSlider'
import BookSlider from '../../components/Book/BookSlider'
import useUserPage from '../../data/hooks/useUserPage'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'
import useHeaderTitle from '../../util/useHeaderTitle'
import useReportActionSheet from './useReportActionSheet'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'

export default ({ route, navigation }) => {
  const { _id, isSelf, selfId } = getUserIDAndIsSelf(route)
  const { data, loading, errorMessage } = useUserPage({ _id })
  const Styles = useStyles()
  const theme = useTheme()
  const showReportActionSheet = useReportActionSheet(
    _id,
    data && data.user.isinappropriateflagged
  )

  useHeaderTitle(data ? data.user.name : '')

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (errorMessage)
    return (
      <View style={Styles.center}>
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      </View>
    )

  if (data)
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: Styles.standardPageInset }}
      >
        <View
          style={{ padding: Styles.standardPageInset, flexDirection: 'row' }}
        >
          <ProfilePictureCircle
            profilePicturePath={data.user.profilePicturePath}
            name={data.user.name}
            size={130}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            {!isSelf && (
              <>
                <FollowButton
                  _id={_id}
                  isSelfFollowing={data.user.followers.some(
                    follower => follower._id.toString() === selfId.toString()
                  )}
                />
                <TouchableOpacity onPress={showReportActionSheet}>
                  <FontAwesome5
                    name={
                      data.user.isinappropriateflagged
                        ? 'font-awesome-flag'
                        : 'flag'
                    }
                    size={25}
                    color={theme.current.complement}
                    style={{ marginTop: 15 }}
                  />
                </TouchableOpacity>
              </>
            )}
            {isSelf && (
              <PressButton
                onPress={() => navigation.navigate('profile')}
                text='Profile'
              />
            )}
          </View>
        </View>
        {!!data.user.feedBooks.filter(feedBook => feedBook.favorite).length && (
          <FeedBookSlider
            feedBooks={data.user.feedBooks.filter(
              feedBook => feedBook.favorite
            )}
            isSelf={isSelf}
            title='Favorites'
          />
        )}
        {!!data.user.wishBooks.length && (
          <BookSlider books={data.user.wishBooks} title='Wish list' />
        )}
        <View
          style={{ paddingHorizontal: Styles.standardPageInset, marginTop: 25 }}
        >
          <Typography type='h2'>Books</Typography>
          {data.user.feedBooks.map(feedBook => (
            <FeedBookCard
              feedBook={feedBook}
              isSelf={isSelf}
              key={feedBook._id}
            />
          ))}
          {data.user.feedBooks.length === 0 && (
            <View style={Styles.center}>
              <Typography>No books added</Typography>
              {isSelf && (
                <PressButton
                  text='Dicover books!'
                  color={theme.current.main}
                  onPress={() => navigation.navigate('Books')}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    )
}

function getUserIDAndIsSelf(route) {
  const paramsId = route.params && route.params._id
  const selfId = useContext(UserContext)._id
  const isSelf = !Boolean(paramsId) || selfId === paramsId
  const _id = isSelf ? selfId : paramsId
  return { _id, isSelf, selfId }
}
