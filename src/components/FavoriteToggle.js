import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, TouchableOpacity } from 'react-native'
import Typography from '../components/Typography'

export default ({ favorite, setFavorite }) => (
  <View
    style={{
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Typography type='h4'>Favorite: </Typography>
    <TouchableOpacity onPress={() => setFavorite(!favorite)}>
      <AntDesign name={favorite ? 'star' : 'staro'} size={27} color='gold' />
    </TouchableOpacity>
  </View>
)
