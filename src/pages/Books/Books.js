import React from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import useStyles from '../../util/useStyles'
import Search from './Search'
import useHeaderTitle from '../../util/useHeaderTitle'
import { useQuery } from '@apollo/react-hooks'
import BooksPageQuery from '../../queries/BooksPageQuery'
import useApolloError from '../../util/useApolloError'
import ErrorCenter from '../../components/ErrorCenter'
import Typography from '../../components/Typography'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const { data, loading, error } = useQuery(BooksPageQuery)
  const errorMessage = useApolloError(error)
  const styles = useStyles()
  const navigation = useNavigation()
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
      {data && (
        <>
          <Typography type='h2' style={{ margin: styles.standardMargin }}>
            Bestsellers
          </Typography>
          {data.bestSellerLists.map(list => (
            <TouchableOpacity
              key={list.name}
              style={{
                backgroundColor: styles.theme.current.primary,
                padding: styles.standardMargin,
                borderTopColor: styles.theme.current.border,
                borderTopWidth: 0.7,
              }}
              onPress={() =>
                navigation.navigate('bookList', { name: list.name })
              }
            >
              <Typography>{list.name}</Typography>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  )
}
