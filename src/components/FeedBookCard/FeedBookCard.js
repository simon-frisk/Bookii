import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import Typography from '../Typography'
import BookCover from '../BookCover'
import { useNavigation } from '@react-navigation/native'
import Card from '../Card'
import { AuthContext } from '../../util/AuthProvider'
import UserBar from './UserBar'

export default ({
  bookId,
  book_id,
  title,
  thumbnail,
  profilePicturePath,
  user_id,
  name,
  comment,
  date,
}) => {
  const navigation = useNavigation()
  const { _id: self_id } = useContext(AuthContext)

  return (
    <Card>
      <UserBar
        isSelf={user_id.toString() === self_id.toString()}
        user_id={user_id}
        book_id={book_id}
        profilePicturePath={profilePicturePath}
        name={name}
        date={date}
      />
      <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
        <Typography size='h2' style={{ marginBottom: 10 }}>
          {title}
        </Typography>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Typography style={{ flex: 1 }}>{comment}</Typography>
          <BookCover uri={thumbnail} width={120} style={{ marginRight: 20 }} />
        </View>
      </TouchableOpacity>
    </Card>
  )
}
