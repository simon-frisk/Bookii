import React from 'react'
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import SmallBookCardSlider from '../../components/bookcard/SmallBookCardSlider'
import useBookListsPage from '../../data/hooks/useBookListsPage'
import useStyles from '../../util/useStyles'

export default () => {
  const { data, loading, errorMessage } = useBookListsPage()
  const Styles = useStyles()

  if (errorMessage)
    return (
      <View style={Styles.center}>
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      </View>
    )

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  return (
    <FlatList
      data={data.bookLists}
      renderItem={({ item }) => (
        <SmallBookCardSlider title={item.name} books={item.books} />
      )}
      keyExtractor={item => item.name}
    />
  )
}
