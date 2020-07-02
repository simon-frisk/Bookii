import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../root/UserProvider'
import BookCover from '../../BookCover'
import UserBar from './UserBar'
import useStyles from '../../../util/useStyles'
import Typography from '../..//Typography'

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
  const { _id: self_id } = useContext(UserContext)
  const Styles = useStyles()

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
        <Typography type='h2'>{title}</Typography>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {!!comment && (
            <Typography style={{ flex: 1, marginRight: 20 }}>
              {comment}
            </Typography>
          )}
          <BookCover uri={thumbnail} width={120} title={title} />
        </View>
      </TouchableOpacity>
      <Typography style={{ marginTop: 10 }}>
        {new Date(date).toDateString()}
      </Typography>
    </View>
  )
}
