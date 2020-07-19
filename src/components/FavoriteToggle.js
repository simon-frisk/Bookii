import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, TouchableOpacity } from 'react-native'
import Typography from '../components/Typography'
import useStyles from '../util/useStyles'

export default ({ favorite, setFavorite }) => {
  const styles = useStyles()
  return (
    <View
      style={{
        margin: styles.standardMargin,
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
}
