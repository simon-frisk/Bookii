import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import Styles from '../../util/Styles'
import { AuthContext } from '../../util/AuthProvider'
import useApolloError from '../../util/useApolloError'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'
import UserPage from './UserQuery'
import FeedBookCardSlider from '../../components/bookcard/FeedBookCardSlider'

export default ({ route, navigation }) => {
  const { _id, isSelf, selfId } = getUserIDAndIsSelf(route)
  const { data, loading, error } = useQuery(UserPage, {
    variables: { _id },
  })
  const errorMessage = useApolloError(error)

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (error)
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
        <View style={{ padding: Styles.standardPageInset }}>
          <View style={{ alignItems: 'center' }}>
            <ProfilePictureCircle
              profilePicturePath={data.user.profilePicturePath}
              name={data.user.name}
              size={70}
            />
            <Text style={Styles.h1}>{data.user.name}</Text>
          </View>
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
        {/*Some cool text if no books are added*/}
        {!!data.user.favoriteBooks.length && (
          <FeedBookCardSlider
            feedBooks={data.user.favoriteBooks}
            isSelf={isSelf}
            title='Favorite books'
          />
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
