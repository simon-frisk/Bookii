import React from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import BookSlider from '../../components/Book/BookSlider'
import Search from './Search'
import useHeaderTitle from '../../util/useHeaderTitle'
import { useQuery } from '@apollo/react-hooks'
import BooksPageQuery from '../../queries/BooksPageQuery'
import useApolloError from '../../util/useApolloError'
import ErrorCenter from '../../components/ErrorCenter'

export default () => {
  const { data, loading, error } = useQuery(BooksPageQuery)
  const errorMessage = useApolloError(error)
  const styles = useStyles()
  useHeaderTitle('Books')

  return (
    <ScrollView>
      <Search />
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
      {errorMessage && <ErrorCenter message={errorMessage} />}
      {data &&
        data.bookLists.map(list => (
          <BookSlider title={list.name} key={list.name} books={list.books} />
        ))}
    </ScrollView>
  )
}
