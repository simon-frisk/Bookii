import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, View } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import BookCard from '../../components/BookCard'
import TextField from '../../components/TextField'
import ApolloError from '../../components/ApolloError'
import Typography from '../../components/Typography'
import Styles from '../../util/Styles'

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
        style={Styles.standardMargin}
        placeholder='search'
      />
      <FlatList
        data={data && data.bookSearch}
        contentContainerStyle={Styles.pageContainer}
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
              <View style={Styles.center}>
                <ActivityIndicator />
              </View>
            )}
            {data &&
              (query ? (
                <View style={Styles.center}>
                  <Typography>No books found</Typography>
                </View>
              ) : (
                <View style={Styles.center}>
                  <Typography>Search for books</Typography>
                </View>
              ))}
          </>
        )}
      />
    </>
  )
}
