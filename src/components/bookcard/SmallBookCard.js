import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../BookCover'
import Typography from '../Typography'

export default ({ bookId, title, thumbnail, style }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('book', { bookId })}
      style={style}
    >
      <BookCover uri={thumbnail} width={160} />
      <Typography type='h4' style={{ width: 160, paddingTop: 10 }}>
        {title}
      </Typography>
    </TouchableOpacity>
  )
}
