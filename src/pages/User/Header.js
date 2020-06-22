import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'
import Styles from '../../util/Styles'

export default ({ profilePicturePath, name, isSelf, isSelfFollowing, _id }) => {
  const navigation = useNavigation()

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={80}
        />
        <View>
          <Text style={Styles.h1}>{name}</Text>
          {isSelf ? (
            <PressButton
              text='Profile'
              onPress={() => {
                navigation.navigate('profile')
              }}
            />
          ) : (
            <FollowButton isSelfFollowing={isSelfFollowing} _id={_id} />
          )}
        </View>
      </View>
      <Text style={{ marginTop: 30, ...Styles.h1 }}>Feed</Text>
    </View>
  )
}
