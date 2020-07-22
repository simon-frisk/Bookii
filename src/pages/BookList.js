import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookListPage from '../queries/BookListPage'
import { View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import useStyles from '../util/useStyles'
import Typography from '../components/Typography'
import ErrorCenter from '../components/ErrorCenter'
import useApolloError from '../util/useApolloError'
import BookCard from '../components/Book/BookCard'

export default ({ route }) => {
  const name = route.params.name
  const { data, loading, error } = useQuery(BookListPage, {
    variables: { name },
  })
  const errorMessage = useApolloError(error)
  const styles = useStyles()

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    )
  if (error) return <ErrorCenter message={errorMessage} />
  return (
    <FlatList
      ListHeaderComponent={() => (
        <Typography type='h2' style={{ padding: styles.standardMargin }}>
          {data.bookList.name}
        </Typography>
      )}
      data={data.bookList.books}
      keyExtractor={item => item.bookId}
      renderItem={({ item }) => <BookCard book={item} />}
    />
  )
}
