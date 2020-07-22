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
import Cell from '../../components/Table/Cell'
import Table from '../../components/Table/Table'

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
        <Table title='Bestsellers'>
          {data.bestSellerLists.map(list => (
            <Cell
              key={list.name}
              title={list.name}
              onPress={() =>
                navigation.navigate('bookList', { name: list.name })
              }
              Left={() => <Typography>📚</Typography>}
            />
          ))}
        </Table>
      )}
    </ScrollView>
  )
}
