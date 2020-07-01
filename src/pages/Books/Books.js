import React from 'react'
import useBooksPage from '../../data/hooks/useBooksPage'
import { FlatList, ScrollView, View, ActivityIndicator } from 'react-native'
import useStyles from '../../util/useStyles'
import useTheme from '../../util/useTheme'
import Typography from '../../components/Typography'
import SmallBookCardSlider from '../../components/bookcard/SmallBookCardSlider'
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
          <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
        </View>
      )}
      {data && (
        <>
          <Search />
          <Typography
            type='h2'
            style={{ paddingHorizontal: styles.standardPageInset }}
          >
            Toplists
          </Typography>
          <FlatList
            data={data.bookLists}
            renderItem={({ item }) => (
              <SmallBookCardSlider title={item.name} books={item.books} />
            )}
            keyExtractor={item => item.name}
          />
        </>
      )}
    </ScrollView>
  )
}
