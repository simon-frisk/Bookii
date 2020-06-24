import React from 'react'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Styles from '../../util/Styles'
import useApolloError from '../../util/useApolloError'
import TopInfoArea from './TopInfoArea'
import FeedBookCard from '../../components/FeedBookCard/FeedBookCard'

export const BookPage = gql`
  query BookPage($bookId: String!) {
    book(bookId: $bookId) {
      title
      bookId
      subTitle
      authors
      thumbnail
      pages
      published
      publisher
      wikipediadescription
    }
    user {
      _id
      name
      profilePicturePath
      feedBooks(bookId: $bookId) {
        _id
        date
        comment
      }
    }
  }
`

export default ({ route }) => {
  const { data, loading, error } = useQuery(BookPage, {
    variables: { bookId: route.params.bookId },
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

  if (data && !data.book)
    return (
      <View style={Styles.center}>
        <Text>Book not found</Text>
      </View>
    )

  if (data && data.book && data.user)
    return (
      <ScrollView
        contentContainerStyle={[
          Styles.pageContainer,
          Styles.extraHorizontalPagePadding,
        ]}
      >
        <TopInfoArea
          thumbnail={data.book.thumbnail}
          title={data.book.title}
          bookId={data.book.bookId}
          subTitle={data.book.subTitle}
          authors={data.book.authors}
          pages={data.book.pages}
          published={data.book.published}
          publisher={data.book.publisher}
          wikipediadescription={data.book.wikipediadescription}
          alreadyRead={data.user.feedBooks.length}
        />
        {data.user.feedBooks.map(feedBook => (
          <FeedBookCard
            key={feedBook._id}
            book_id={feedBook._id}
            comment={feedBook.comment}
            date={feedBook.date}
            bookId={data.book.bookId}
            title={data.book.title}
            thumbnail={data.book.thumbnail}
            user_id={data.user._id}
            profilePicturePath={data.user.profilePicturePath}
            name={data.user.name}
          />
        ))}
      </ScrollView>
    )
}
