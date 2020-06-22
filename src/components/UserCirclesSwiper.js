import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureCircle from './ProfilePictureCircle'

export default ({ users }) => {
  const navigation = useNavigation()

  return (
    <FlatList
      horizontal={true}
      data={users}
      keyExtractor={(item, index) => item._id + index}
      renderItem={({ item: user }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('user', { _id: user._id })}
        >
          <ProfilePictureCircle
            profilePicturePath={user.profilePicturePath}
            size={70}
            style={{ margin: 7 }}
          />
        </TouchableOpacity>
      )}
    />
  )
}
