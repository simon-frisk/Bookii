import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import CategoryPageQuery from '../queries/CategoryPageQuery'
import { View, ActivityIndicator, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import useStyles from '../util/useStyles'
import ErrorCenter from '../components/ErrorCenter'
import useApolloError from '../util/useApolloError'
import BookCard from '../components/Book/BookCard'
import useHeaderTitle from '../util/useHeaderTitle'
import Typography from '../components/Typography'

export default ({ route }) => {
  const name = route.params.name
  const { data, loading, error } = useQuery(CategoryPageQuery, {
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
      data={data.category.books}
      ListHeaderComponent={() => (
        <View
          style={{
            padding: styles.standardMargin,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography type='h2' style={{ flex: 1 }}>
            {data.category.name}
          </Typography>
          <Text style={{ fontSize: 60, marginLeft: 10 }}>
            {data.category.icon}
          </Text>
        </View>
      )}
      keyExtractor={item => item.bookId}
      renderItem={({ item }) => <BookCard book={item} />}
    />
  )
}
