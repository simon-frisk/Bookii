import React from 'react'
import { TouchableOpacity } from 'react-native'
import Typography from './Typography'
import Card from './Card'
import ProfilePictureCircle from './ProfilePictureCircle'
import { useNavigation } from '@react-navigation/native'

export default ({ name, _id, profilePicturePath }) => {
  const navigation = useNavigation()

  return (
    <Card>
      <TouchableOpacity
        onPress={() => navigation.navigate('user', { _id })}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={40}
        />
        <Typography size='h3' style={{ marginLeft: 10 }}>
          {name}
        </Typography>
      </TouchableOpacity>
    </Card>
  )
}
