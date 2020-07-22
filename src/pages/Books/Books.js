import React from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
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
        <>
          <Typography type='h2'>Bestsellers</Typography>
          <Table
            title='Bestsellers'
            description='Bestseller lists from The New York Times'
            initialLength={5}
            data={data.bestSellerLists}
            renderCell={list => (
              <Cell
                key={list.name}
                title={list.name}
                onPress={() =>
                  navigation.navigate('bookList', { name: list.name })
                }
                Left={() => <Typography>{list.icon}</Typography>}
              />
            )}
          />
        </>
      )}
    </ScrollView>
  )
}
