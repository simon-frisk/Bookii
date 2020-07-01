import React from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import useStyles from '../util/useStyles'
import FeedBookUserCard from '../components/bookcard/FeedBookUserCard/FeedBookUserCard'
import useApolloError from '../util/useApolloError'

export const FeedPage = gql`
  query FeedPage($after: ID) {
    feed(after: $after) {
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
  const { data, loading, error, fetchMore } = useQuery(FeedPage)
  const errorMessage = useApolloError(error)
  const Styles = useStyles()

  return (
    <FlatList
      data={data ? data.feed : []}
      keyExtractor={({ _id }, index) => index + _id}
      contentContainerStyle={{ padding: Styles.standardPageInset }}
      ListEmptyComponent={() => {
        if (error)
          return (
            <View style={Styles.center}>
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            </View>
          )
        if (loading)
          return (
            <View style={Styles.center}>
              <ActivityIndicator />
            </View>
          )
        return (
          <View style={Styles.center}>
            <Text>Follow other people to see their books on your feed!</Text>
          </View>
        )
      }}
      renderItem={({ item }) => (
        <FeedBookUserCard
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
      onEndReached={() => {
        fetchMore({
          variables: { after: data.feed[data.feed.length - 1]._id },
          updateQuery(prev, { fetchMoreResult }) {
            return { feed: [...prev.feed, ...fetchMoreResult.feed] }
          },
        })
      }}
    />
  )
}
