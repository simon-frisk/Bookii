import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import Typography from '../../components/Typography'
import PressButton from '../../components/PressButton'
import FollowButton from './FollowButton'

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
          <Typography size='h1'>{name}</Typography>
          {isSelf ? (
            <PressButton
              text='Settings'
              onPress={() => {
                navigation.navigate('userSettings')
              }}
            />
          ) : (
            <FollowButton isSelfFollowing={isSelfFollowing} _id={_id} />
          )}
        </View>
      </View>
      <Typography size='h1' style={{ marginTop: 30 }}>
        Feed
      </Typography>
    </View>
  )
}
