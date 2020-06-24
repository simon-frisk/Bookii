import React, { useContext } from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import Styles from '../../util/Styles'
import FeedBookCard from '../../components/FeedBookCard/FeedBookCard'
import Header from './Header'
import { AuthContext } from '../../util/AuthProvider'
import UserPage from './UserQuery'
import useApolloError from '../../util/useApolloError'

export default ({ route }) => {
  const paramsId = route.params && route.params._id
  const selfId = useContext(AuthContext)._id
  const isSelf = !Boolean(paramsId) || selfId === paramsId
  const _id = isSelf ? selfId : paramsId

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
      <FlatList
        ListHeaderComponent={() => (
          <Header
            profilePicturePath={data.user.profilePicturePath}
            name={data.user.name}
            isSelf={isSelf}
            isSelfFollowing={data.user.followers
              .map(u => u._id)
              .includes(selfId)}
            _id={_id}
          />
        )}
        ListEmptyComponent={() => (
          <View style={Styles.center}>
            <Text>No books on feed yet!</Text>
          </View>
        )}
        data={data.user.feedBooks}
        keyExtractor={({ _id }, index) => index + _id}
        contentContainerStyle={[
          Styles.pageContainer,
          Styles.extraHorizontalPagePadding,
        ]}
        renderItem={({ item: feedBook }) => {
          return (
            <FeedBookCard
              user_id={data.user._id}
              name={data.user.name}
              profilePicturePath={data.user.profilePicturePath}
              book_id={feedBook._id}
              bookId={feedBook.book.bookId}
              thumbnail={feedBook.book.thumbnail}
              title={feedBook.book.title}
              comment={feedBook.comment}
              date={feedBook.date}
            />
          )
        }}
      />
    )
}
