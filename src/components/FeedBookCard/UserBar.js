import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import ProfilePictureCircle from '../ProfilePictureCircle'
import Typography from '../Typography'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default ({ isSelf, user_id, book_id, profilePicturePath, name }) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!isSelf) navigation.navigate('user', { _id: user_id })
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={45}
          style={{ marginRight: 10 }}
        />
        <Typography size='h3'>{name}</Typography>
      </TouchableOpacity>
      {isSelf && (
        <TouchableOpacity
          onPress={() => navigation.navigate('editFeedBook', { _id: book_id })}
          style={{ padding: 7 }}
        >
          <SimpleLineIcons name='options-vertical' size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}
