import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import Typography from './Typography'
import BookCover from './BookCover'
import ProfilePictureCircle from './ProfilePictureCircle'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Card from './Card'

export default ({
  bookId,
  _id,
  title,
  thumbnail,
  profilePicturePath,
  name,
  comment,
  date,
}) => {
  const navigation = useNavigation()

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
          flex: 1,
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={40}
        />
        <Typography size='h4' bold>
          {name} - {new Date(date).toDateString()}
        </Typography>
        <TouchableOpacity
          onPress={() => navigation.navigate('editFeedBook', { _id })}
          style={{ padding: 7 }}
        >
          <SimpleLineIcons name='options-vertical' size={20} />
        </TouchableOpacity>
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
