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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={75}
        />
        <View style={{ marginRight: 40 }}>
          <Typography size='h1'>{name}</Typography>
          {isSelf ? (
            <PressButton
              text='Settings'
              type='outline'
              onPress={() => {
                navigation.navigate('userSettings')
              }}
            />
          ) : (
            <FollowButton isSelfFollowing={isSelfFollowing} _id={_id} />
          )}
        </View>
      </View>
      <Typography size='h1' style={{ marginTop: 40 }}>
        My Feed
      </Typography>
    </View>
  )
}
