import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import TextField from '../../components/TextField'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import BookSlider from '../../components/Book/BookSlider'
import { useLazyQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import gql from 'graphql-tag'

const BookSearchQuery = gql`
  query BookSearch($query: String!) {
    bookSearch(query: $query) {
      bookId
      title
      authors
      thumbnail
    }
  }
`

export default () => {
  const [callQuery, { data, loading, error }] = useLazyQuery(BookSearchQuery)
  const errorMessage = useApolloError(error)
  const [query, setQuery] = useState('')
  const Styles = useStyles()

  useEffect(() => callQuery({ variables: { query } }), [query])

  return (
    <>
      <TextField
        value={query}
        icon='search'
        onChangeText={query => {
          setQuery(query)
        }}
        style={{
          marginHorizontal: Styles.standardMargin,
          marginVertical: Styles.standardMargin,
        }}
        placeholder='Search'
      />
      {loading && !!query && (
        <ActivityIndicator style={{ padding: 10, textAlign: 'center' }} />
      )}
      {errorMessage && (
        <Typography
          style={{
            padding: 10,
            textAlign: 'center',
            color: Styles.theme.current.error,
          }}
        >
          {errorMessage}
        </Typography>
      )}
      {!!data && !data.bookSearch.length && !!query && (
        <Typography style={{ padding: 10, textAlign: 'center' }}>
          No books found
        </Typography>
      )}
      {!!data && !!data.bookSearch.length && (
        <BookSlider title='Search results' books={data.bookSearch} />
      )}
    </>
  )
}
