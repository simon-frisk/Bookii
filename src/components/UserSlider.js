import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureCircle from './ProfilePictureCircle'
import Typography from './Typography'

export default ({ users }) => {
  const navigation = useNavigation()

  return (
    <FlatList
      horizontal={true}
      contentContainerStyle={{ paddingBottom: 10 }}
      data={users}
      keyExtractor={(item, index) => item._id + index}
      renderItem={({ item: user }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('user', { _id: user._id })}
          style={{ alignItems: 'center' }}
        >
          <ProfilePictureCircle
            profilePicturePath={user.profilePicturePath}
            name={user.name}
            size={70}
            style={{ margin: 7 }}
          />
          <Typography>{user.name.split(' ')[0]}</Typography>
        </TouchableOpacity>
      )}
    />
  )
}
