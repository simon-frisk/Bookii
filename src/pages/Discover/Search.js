import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, View } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import BookCard from '../../components/BookCard'
import Center from '../../components/Center'
import TextField from '../../components/TextField'
import ApolloError from '../../components/ApolloError'
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
  const [query, setQuery] = useState('')

  useEffect(() => {
    callSearchQuery({ variables: { query } })
  }, [query])

  return (
    <>
      <TextField
        value={query}
        icon='search1'
        onChangeText={query => {
          setQuery(query)
        }}
        style={{ margin: ' 3%' }}
        placeholder='search'
      />
      <FlatList
        data={data && data.bookSearch}
        contentContainerStyle={{ padding: '3%' }}
        keyExtractor={({ bookId }, index) => bookId + index}
        renderItem={({ item: book }) => (
          <BookCard
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            title={book.title}
            authors={book.authors}
          />
        )}
        ListEmptyComponent={() => (
          <>
            {error && <ApolloError type='errorcomponent' error={error} />}
            {loading && (
              <Center>
                <ActivityIndicator />
              </Center>
            )}
            {data &&
              (query ? (
                <Center>
                  <Typography>No books found</Typography>
                </Center>
              ) : (
                <Center>
                  <Typography>Search for books</Typography>
                </Center>
              ))}
          </>
        )}
      />
    </>
  )
}
