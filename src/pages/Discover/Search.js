import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import useSearchPage from '../../data/hooks/useSearchPage'
import BookCard from '../../components/bookcard/BookCard'
import TextField from '../../components/TextField'
import useStyles from '../../util/useStyles'

export default () => {
  const { callQuery, data, loading, errorMessage } = useSearchPage()
  const [query, setQuery] = useState('')
  const Styles = useStyles()

  useEffect(() => callQuery({ variables: { query } }), [query])

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
          style={{ margin: Styles.standardPageInset }}
          placeholder='Search'
        />
      </View>
      <FlatList
        data={data && data.bookSearch}
        contentContainerStyle={{ padding: Styles.standardPageInset }}
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
            {errorMessage && (
              <View style={Styles.center}>
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
              </View>
            )}
            {loading && !!query && (
              <View style={Styles.center}>
                <ActivityIndicator />
              </View>
            )}
            {!query && (
              <View style={Styles.center}>
                <Text>Search for books</Text>
              </View>
            )}
            {!!data && !loading && !errorMessage && !!query && (
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
