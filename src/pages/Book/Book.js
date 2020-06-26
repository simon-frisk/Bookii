import React from 'react'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Styles from '../../util/Styles'
import useApolloError from '../../util/useApolloError'
import TopInfoArea from './TopInfoArea'
import FeedBookCardSlider from '../../components/bookcard/FeedBookCardSlider'

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
      onselffeed {
        _id
        date
        comment
        book {
          bookId
          title
          thumbnail
        }
      }
      onfollowingfeed {
        _id
        date
        comment
        book {
          bookId
          title
          thumbnail
        }
        user {
          name
          profilePicturePath
          _id
        }
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

  if (data) {
    if (!data.book) {
      return (
        <View style={Styles.center}>
          <Text>Book not found</Text>
        </View>
      )
    }
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: Styles.standardPageInset }}
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
          alreadyRead={!!data.book.onselffeed.length}
        />
        {!!data.book.onselffeed.length && (
          <FeedBookCardSlider
            feedBooks={data.book.onselffeed}
            isSelf={true}
            title='On your feed'
          />
        )}
        {!!data.book.onfollowingfeed.length && (
          <FeedBookCardSlider
            feedBooks={data.book.onfollowingfeed}
            isSelf={false}
            title='On following feeds'
          />
        )}
      </ScrollView>
    )
  }
}
