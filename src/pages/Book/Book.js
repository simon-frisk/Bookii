import React from 'react'
import { SectionList, ActivityIndicator } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Styles from '../../util/Styles'
import Center from '../../components/Center'
import ApolloError from '../../components/ApolloError'
import TopInfoArea from './TopInfoArea'
import Typography from '../../components/Typography'
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
  const bookId = route.params.bookId
  const { data, loading, error } = useQuery(BookPage, {
    variables: { bookId },
  })

  if (loading)
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )

  if (error) return <ApolloError type='errorcomponent' error={error} />

  if (data && !data.book)
    return (
      <Center>
        <Typography>Book not found</Typography>
      </Center>
    )

  if (data && data.book && data.user)
    return (
      <SectionList
        ListHeaderComponent={() => (
          <TopInfoArea
            thumbnail={data.book.thumbnail}
            title={data.book.title}
            bookId={data.book.bookId}
            subTitle={data.book.subTitle}
            authors={data.book.authors}
            pages={data.book.pages}
            published={data.book.published}
            publisher={data.book.publisher}
            alreadyRead={data.user.feedBooks.length}
          />
        )}
        sections={[
          {
            data: data.user.feedBooks,
            renderItem: ({ item: { comment, date, _id } }) => (
              <FeedBookCard
                book_id={_id}
                bookId={data.book.bookId}
                title={data.book.title}
                thumbnail={data.book.thumbnail}
                user_id={data.user._id}
                profilePicturePath={data.user.profilePicturePath}
                name={data.user.name}
                comment={comment}
                date={date}
              />
            ),
          },
        ]}
        keyExtractor={(item, index) => index + item._id}
        contentContainerStyle={Styles.pageContainer}
      />
    )
}
