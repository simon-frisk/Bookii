import React, { useContext } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import Styles from '../../util/Styles'
import Center from '../../components/Center'
import ApolloError from '../../components/ApolloError'
import Typography from '../../components/Typography'
import FeedBookCard from '../../components/FeedBookCard'
import gql from 'graphql-tag'
import Header from './Header'
import { AuthContext } from '../../util/AuthProvider'

export const UserPage = gql`
  query UserPage($userId: ID) {
    user(userId: $userId) {
      _id
      name
      profilePicturePath
      feedBooks {
        _id
        bookId
        comment
        date
        book {
          thumbnail
          title
          bookId
        }
      }
    }
  }
`

export default ({ route }) => {
  const userId = route.params && route.params.userId
  const selfUserId = useContext(AuthContext).userId
  const isSelf = !Boolean(userId) || selfUserId === userId

  const { data, loading, error } = useQuery(UserPage, {
    variables: { userId: isSelf ? selfUserId : userId },
  })

  if (loading)
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )

  if (error) return <ApolloError type='errorcomponent' error={error} />

  if (data)
    return (
      <FlatList
        ListHeaderComponent={() => (
          <Header
            profilePicturePath={data.user.profilePicturePath}
            name={data.user.name}
            isSelf={isSelf}
          />
        )}
        ListEmptyComponent={() => (
          <Center>
            <Typography>No books on feed yet!</Typography>
          </Center>
        )}
        data={data.user.feedBooks}
        keyExtractor={({ _id }, index) => index + _id}
        contentContainerStyle={Styles.pageContainer}
        renderItem={({ item: feedBook }) => (
          <FeedBookCard
            _id={feedBook._id}
            bookId={feedBook.book.bookId}
            thumbnail={feedBook.book.thumbnail}
            title={feedBook.book.title}
            name={data.user.name}
            profilePicturePath={data.user.profilePicturePath}
            comment={feedBook.comment}
            date={feedBook.date}
          />
        )}
      />
    )
}
