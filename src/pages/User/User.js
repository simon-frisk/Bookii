import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import Styles from '../../util/Styles'
import { AuthContext } from '../../util/AuthProvider'
import UserPage from './UserQuery'
import useApolloError from '../../util/useApolloError'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import FollowButton from './FollowButton'
import PressButton from '../../components/PressButton'
import { FlatList } from 'react-native-gesture-handler'
import ReadBookCard from './ReadBookCard'

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
      <ScrollView>
        <View
          style={[{ padding: Styles.standardPageInset }, { marginBottom: 30 }]}
        >
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
        {data.user.feedBooks && (
          <>
            <Text
              style={[
                Styles.h2,
                {
                  marginHorizontal: Styles.standardPageInset,
                  marginBottom: 10,
                },
              ]}
            >
              Feed
            </Text>
            <FlatList
              data={data.user.feedBooks}
              keyExtractor={({ _id }, index) => index + _id}
              horizontal={true}
              renderItem={({ item: feedBook }) => (
                <ReadBookCard
                  isSelf={isSelf}
                  feedBookId={feedBook._id}
                  bookId={feedBook.book.bookId}
                  thumbnail={feedBook.book.thumbnail}
                  title={feedBook.book.title}
                  comment={feedBook.comment}
                  date={feedBook.date}
                  style={{ marginLeft: Styles.standardPageInset }}
                />
              )}
            />
          </>
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
