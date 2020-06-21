import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import BookCard from '../../components/BookCard'
import TextField from '../../components/TextField'
import ApolloError from '../../components/ApolloError'
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

  useEffect(() => search(), [query])

  const search = () => {
    callSearchQuery({ variables: { query } })
  }

  return (
    <>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: 'lightgrey',
          backgroundColor: 'white',
        }}
      >
        <TextField
          value={query}
          icon='search1'
          onChangeText={query => {
            setQuery(query)
          }}
          onEndEditing={search}
          style={Styles.standardMargin}
          placeholder='search'
        />
      </View>
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
            {!query && (
              <View style={Styles.center}>
                <Text>Search for books</Text>
              </View>
            )}
            {!!data && !!query && (
              <View style={Styles.center}>
                <Text>No books found</Text>
              </View>
            )}
          </>
        )}
      />
    </>
  )
}
