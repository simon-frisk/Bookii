import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import useStyles from '../../util/useStyles'
import { UserContext } from '../../root/UserProvider'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'
import FeedBookCardSlider from '../../components/bookcard/FeedBookCardSlider'
import SmallBookCardSlider from '../../components/bookcard/SmallBookCardSlider'
import useUserPage from '../../data/hooks/useUserPage'
import UserMenu from './UserMenu'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

export default ({ route, navigation }) => {
  const { _id, isSelf, selfId } = getUserIDAndIsSelf(route)
  const { data, loading, errorMessage } = useUserPage({ _id })
  const Styles = useStyles()
  const theme = useTheme()

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
        {!isSelf && (
          <UserMenu _id={_id} isFlagged={data.user.isinappropriateflagged} />
        )}
        <View style={{ padding: Styles.standardPageInset }}>
          <View style={{ alignItems: 'center' }}>
            <ProfilePictureCircle
              profilePicturePath={data.user.profilePicturePath}
              name={data.user.name}
              size={100}
            />
            <Typography type='h1'>{data.user.name}</Typography>
          </View>
          <View style={{ marginHorizontal: 50 }}>
            {!isSelf && (
              <FollowButton
                _id={_id}
                isSelfFollowing={data.user.followers.some(
                  follower => follower._id.toString() === selfId.toString()
                )}
              />
            )}
            {isSelf && (
              <PressButton
                text='Profile'
                onPress={() => {
                  navigation.navigate('profile')
                }}
              />
            )}
          </View>
        </View>
        {/*Some cool text if no books are added*/}
        {!!data.user.feedBooks.filter(feedBook => feedBook.favorite).length && (
          <FeedBookCardSlider
            feedBooks={data.user.feedBooks.filter(
              feedBook => feedBook.favorite
            )}
            isSelf={isSelf}
            title='Favorites'
          />
        )}
        {!!data.user.wishBooks.length && (
          <SmallBookCardSlider books={data.user.wishBooks} title='Wish list' />
        )}
        {!!data.user.feedBooks.length && (
          <FeedBookCardSlider
            feedBooks={data.user.feedBooks}
            isSelf={isSelf}
            title='Feed'
          />
        )}
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
