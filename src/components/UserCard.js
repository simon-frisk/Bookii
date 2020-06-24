import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import ProfilePictureCircle from './ProfilePictureCircle'
import { useNavigation } from '@react-navigation/native'
import Styles from '../util/Styles'

export default ({ name, _id, profilePicturePath }) => {
  const navigation = useNavigation()

  return (
    <View style={[Styles.card, { padding: 10, marginVertical: 5 }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('user', { _id })}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          name={name}
          size={40}
        />
        <Text style={{ ...Styles.h3, marginHorizontal: 15 }}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}
