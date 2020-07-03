import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import useBookSearch from '../../data/hooks/useBookSearch'
import TextField from '../../components/TextField'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import BookSlider from '../../components/Book/BookSlider'
import useTheme from '../../util/useTheme'

export default () => {
  const { callQuery, data, loading, errorMessage } = useBookSearch()
  const [query, setQuery] = useState('')
  const Styles = useStyles()
  const theme = useTheme()

  useEffect(() => callQuery({ variables: { query } }), [query])

  return (
    <>
      <TextField
        value={query}
        icon='search1'
        onChangeText={query => {
          setQuery(query)
        }}
        style={{ margin: Styles.standardPageInset }}
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
            color: theme.current.error,
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
