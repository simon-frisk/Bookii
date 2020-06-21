import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import BookCover from '../BookCover'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../util/AuthProvider'
import UserBar from './UserBar'
import Styles from '../../util/Styles'

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
    <View style={[Styles.card, { marginVertical: 10, padding: 15 }]}>
      <UserBar
        isSelf={user_id.toString() === self_id.toString()}
        user_id={user_id}
        book_id={book_id}
        profilePicturePath={profilePicturePath}
        name={name}
        date={date}
      />
      <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
        <Text style={{ marginBottom: 10, ...Styles.h2 }}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {!!comment && (
            <Text style={{ flex: 1, marginRight: 20 }}>{comment}</Text>
          )}
          <BookCover uri={thumbnail} width={120} />
        </View>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>{new Date(date).toDateString()}</Text>
    </View>
  )
}
