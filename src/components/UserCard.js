import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Typography from './Typography'
import ProfilePictureCircle from './ProfilePictureCircle'
import { useNavigation } from '@react-navigation/native'
import Styles from '../util/Styles'

export default ({ name, _id, profilePicturePath }) => {
  const navigation = useNavigation()

  return (
    <View
      style={[Styles.card, { padding: 10, marginVertical: 5, width: '100%' }]}
    >
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
        <Typography size='h3' style={{ flex: 1 }}>
          {name}
        </Typography>
      </TouchableOpacity>
    </View>
  )
}
