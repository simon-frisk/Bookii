import React from 'react'
import useBooksPage from '../../data/hooks/useBooksPage'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import BookSlider from '../../components/Book/BookSlider'
import Search from './Search'
import useHeaderTitle from '../../util/useHeaderTitle'

export default () => {
  const { data, loading, errorMessage } = useBooksPage()
  const styles = useStyles()
  useHeaderTitle('Books')

  return (
    <ScrollView>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
      {errorMessage && (
        <View style={styles.center}>
          <Typography style={{ color: styles.theme.current.error }}>
            {errorMessage}
          </Typography>
        </View>
      )}
      {data && (
        <>
          <Search />
          {data.bookLists.map(list => (
            <BookSlider title={list.name} key={list.name} books={list.books} />
          ))}
        </>
      )}
    </ScrollView>
  )
}
