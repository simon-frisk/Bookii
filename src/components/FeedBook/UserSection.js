import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureCircle from '../ProfilePictureCircle'
import Typography from '../Typography'

export default ({ isSelf, user }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      disabled={isSelf}
      onPress={() => {
        navigation.navigate('user', { _id: user._id })
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <ProfilePictureCircle
        profilePicturePath={user.profilePicturePath}
        name={user.name}
        size={50}
        style={{ marginRight: 10 }}
      />
      <Typography type='h3'>{user.name}</Typography>
    </TouchableOpacity>
  )
}
