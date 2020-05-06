import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import Typography from './Typography'
import BookCover from './BookCover'
import ProfilePictureCircle from './ProfilePictureCircle'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Card from './Card'
import { AuthContext } from '../util/AuthProvider'

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (user_id.toString() !== self_id.toString())
              navigation.navigate('user', { _id: user_id })
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <ProfilePictureCircle
            profilePicturePath={profilePicturePath}
            size={45}
            style={{ marginRight: 10 }}
          />
          <Typography size='h4' bold>
            {name} - {new Date(date).toDateString()}
          </Typography>
        </TouchableOpacity>
        {user_id.toString() === self_id.toString() && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('editFeedBook', { _id: book_id })
            }
            style={{ padding: 7 }}
          >
            <SimpleLineIcons name='options-vertical' size={20} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
        <Typography size='h2' style={{ marginBottom: 10 }}>
          {title}
        </Typography>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <BookCover uri={thumbnail} width={120} style={{ marginRight: 20 }} />
          <Typography italic style={{ flex: 1 }}>
            {comment}
          </Typography>
        </View>
      </TouchableOpacity>
    </Card>
  )
}
