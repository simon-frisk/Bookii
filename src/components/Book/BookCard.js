import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../Book/BookCover'

export default ({ bookId, thumbnail, style }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('book', { bookId })}
      style={style}
    >
      <BookCover uri={thumbnail} width={120} />
    </TouchableOpacity>
  )
}
