import React from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Styles from '../util/Styles'
import FeedBookCard from '../components/FeedBookCard/FeedBookCard'
import ApolloError from '../components/ApolloError'

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

  return (
    <FlatList
      data={data ? data.feed : []}
      keyExtractor={({ _id }, index) => index + _id}
      contentContainerStyle={[
        Styles.pageContainer,
        Styles.extraHorizontalPagePadding,
      ]}
      ListEmptyComponent={() => {
        if (error) return <ApolloError error={error} type='errorcomponent' />
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
