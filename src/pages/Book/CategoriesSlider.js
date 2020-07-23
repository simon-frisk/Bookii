import React from 'react'
import useStyles from '../../util/useStyles'
import { View, TouchableOpacity } from 'react-native'
import Typography from '../../components/Typography'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

export default ({ categories }) => {
  const styles = useStyles()
  const navigation = useNavigation()

  return (
    <FlatList
      contentContainerStyle={{
        marginTop: styles.standardMargin,
        paddingHorizontal: styles.standardMargin / 2,
      }}
      data={categories}
      keyExtractor={item => item.name}
      horizontal={true}
      renderItem={({ item: category }) => (
        <TouchableOpacity
          key={category.name}
          style={{
            backgroundColor: styles.theme.current.main,
            borderRadius: 15,
            padding: 6,
            marginBottom: styles.standardMargin,
            marginHorizontal: styles.standardMargin / 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('category', { name: category.name })
          }
        >
          <Typography>{category.icon}</Typography>
          <Typography>{category.name}</Typography>
        </TouchableOpacity>
      )}
    />
  )
}
