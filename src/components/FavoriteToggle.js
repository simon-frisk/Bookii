import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Styles from '../util/Styles'

export default ({ favorite, setFavorite }) => (
  <View
    style={{
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Text style={Styles.h4}>Favorite: </Text>
    <TouchableOpacity onPress={() => setFavorite(!favorite)}>
      <AntDesign name={favorite ? 'star' : 'staro'} size={27} color='gold' />
    </TouchableOpacity>
  </View>
)
