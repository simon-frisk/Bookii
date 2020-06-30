import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import Styles from '../../util/Styles'
import { AuthContext } from '../../util/AuthProvider'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'
import FeedBookCardSlider from '../../components/bookcard/FeedBookCardSlider'
import SmallBookCardSlider from '../../components/bookcard/SmallBookCardSlider'
import useUserPage from '../../data/hooks/useUserPage'
import UserMenu from './UserMenu'

export default ({ route, navigation }) => {
  const { _id, isSelf, selfId } = getUserIDAndIsSelf(route)
  const { data, loading, errorMessage } = useUserPage({ _id })

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (errorMessage)
    return (
      <View style={Styles.center}>
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
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
            <Text style={Styles.h1}>{data.user.name}</Text>
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
  const selfId = useContext(AuthContext)._id
  const isSelf = !Boolean(paramsId) || selfId === paramsId
  const _id = isSelf ? selfId : paramsId
  return { _id, isSelf, selfId }
}
