import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { FlatList, ActivityIndicator } from 'react-native'
import Styles from '../util/Styles'
import Typography from '../components/Typography'
import FeedBookCard from '../components/FeedBookCard'
import ApolloError from '../components/ApolloError'
import Center from '../components/Center'

const FeedPage = gql`
  query FeedPage {
    feed {
      _id
      bookId
      comment
      date
      user {
        _id
        name
        profilePicturePath
      }
      book {
        thumbnail
        title
      }
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(FeedPage)
  return (
    <FlatList
      ListHeaderComponent={() => <Typography size='h1'>Feed</Typography>}
      data={data ? data.feed : []}
      keyExtractor={({ _id }, index) => index + _id}
      contentContainerStyle={Styles.pageContainer}
      ListEmptyComponent={() => {
        if (error) return <ApolloError error={error} type='errorcomponent' />
        if (loading)
          return (
            <Center>
              <ActivityIndicator />
            </Center>
          )
      }}
      renderItem={({ item }) => (
        <FeedBookCard
          book_id={item._id}
          bookId={item.bookId}
          comment={item.comment}
          date={item.date}
          thumbnail={item.book.thumbnail}
          title={item.book.title}
          user_id={item.user._id}
          name={item.user.name}
          profilePicturePath={item.user.profilePicturePath}
        />
      )}
    />
  )
}
