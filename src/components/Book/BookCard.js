import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from './BookCover'
import useStyles from '../../util/useStyles'
import Typography from '../Typography'

export default ({ book }) => {
  const navigation = useNavigation()
  const styles = useStyles()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('book', { bookId: book.bookId })}
      style={{
        flexDirection: 'row',
        marginHorizontal: styles.standardMargin,
        marginVertical: styles.standardMargin / 2,
      }}
    >
      <BookCover uri={book.thumbnail} width={100} />
      <Typography type='h3' style={{ marginLeft: 10, flex: 1 }}>
        {book.title}
      </Typography>
    </TouchableOpacity>
  )
}
