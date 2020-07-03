import React from 'react'
import useBooksPage from '../../data/hooks/useBooksPage'
import { FlatList, ScrollView, View, ActivityIndicator } from 'react-native'
import useStyles from '../../util/useStyles'
import useTheme from '../../util/useTheme'
import Typography from '../../components/Typography'
import BookSlider from '../../components/Book/BookSlider'
import Search from './Search'

export default () => {
  const { data, loading, errorMessage } = useBooksPage()
  const styles = useStyles()
  const theme = useTheme()

  return (
    <ScrollView>
      <Typography type='h1' style={{ padding: styles.standardPageInset }}>
        Books
      </Typography>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
      {errorMessage && (
        <View style={styles.center}>
          <Typography style={{ color: theme.current.error }}>
            {errorMessage}
          </Typography>
        </View>
      )}
      {data && (
        <>
          <Search />
          <FlatList
            data={data.bookLists}
            renderItem={({ item }) => (
              <BookSlider title={item.name} books={item.books} />
            )}
            keyExtractor={item => item.name}
          />
        </>
      )}
    </ScrollView>
  )
}
