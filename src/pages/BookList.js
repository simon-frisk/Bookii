import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookListPage from '../queries/BookListPage'
import { View, ActivityIndicator, Text } from 'react-native'
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
        <View style={{ padding: styles.standardMargin }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography type='h2' style={{ flex: 1 }}>
              {data.bookList.name}
            </Typography>
            <Text style={{ fontSize: 60, marginLeft: 10 }}>
              {data.bookList.icon}
            </Text>
          </View>
        </View>
      )}
      data={data.bookList.books}
      keyExtractor={item => item.bookId}
      renderItem={({ item }) => <BookCard book={item} />}
    />
  )
}
