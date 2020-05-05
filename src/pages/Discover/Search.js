import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import BookCard from '../../components/BookCard'
import Center from '../../components/Center'
import TextField from '../../components/TextField'
import Styles from '../../util/Styles'
import ApolloErrorText from '../../components/ApolloErrorText'
import Typography from '../../components/Typography'

const BookSearch = gql`
  query BookSearch($query: String!) {
    bookSearch(query: $query) {
      bookId
      title
      subTitle
      authors
      thumbnail
    }
  }
`

export default () => {
  const [callSearchQuery, { data, loading, error }] = useLazyQuery(BookSearch)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (data) setBooks(data.bookSearch)
  }, [data])

  const Header = () => {
    const [query, setQuery] = useState('')

    return (
      <>
        <Typography size='h1'>Search</Typography>
        <TextField
          value={query}
          onChangeText={query => {
            setQuery(query)
          }}
          onEndEditing={() => {
            setBooks([])
            callSearchQuery({ variables: { query } })
          }}
          placeholder='title, author etc'
        />
      </>
    )
  }

  const Book = ({ item: book }) => (
    <BookCard
      bookId={book.bookId}
      thumbnail={book.thumbnail}
      title={book.title}
      authors={book.authors}
    />
  )

  const Empty = () => {
    if (error)
      return (
        <Center>
          <ApolloErrorText error={error} />
        </Center>
      )
    if (loading)
      return (
        <Center>
          <ActivityIndicator />
        </Center>
      )
    if (data && !books.length)
      return (
        <Center>
          <Typography>No books found</Typography>
        </Center>
      )
    return (
      <Center>
        <Typography>Find new awesome books!</Typography>
      </Center>
    )
  }

  return (
    <FlatList
      data={books}
      contentContainerStyle={Styles.pageContainer}
      keyExtractor={({ bookId }, index) => bookId + index}
      renderItem={Book}
      ListEmptyComponent={Empty}
      ListHeaderComponent={Header}
    />
  )
}
