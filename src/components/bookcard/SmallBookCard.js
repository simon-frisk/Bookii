import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../BookCover'
import Styles from '../../util/Styles'

export default ({ bookId, title, thumbnail, style }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('book', { bookId })}
      style={style}
    >
      <BookCover uri={thumbnail} width={160} />
      <Text style={[Styles.h4, { width: 160, paddingTop: 10 }]}>{title}</Text>
    </TouchableOpacity>
  )
}
