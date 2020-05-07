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
  query UserPage($_id: ID) {
    user(_id: $_id) {
      _id
      name
      profilePicturePath
      followers {
        _id
      }
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
  const paramsId = route.params && route.params._id
  const selfId = useContext(AuthContext)._id
  const isSelf = !Boolean(paramsId) || selfId === paramsId
  const _id = isSelf ? selfId : paramsId

  const { data, loading, error } = useQuery(UserPage, {
    variables: { _id },
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
            isSelfFollowing={data.user.followers
              .map(u => u._id)
              .includes(selfId)}
            _id={_id}
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
        )}
      />
    )
}
