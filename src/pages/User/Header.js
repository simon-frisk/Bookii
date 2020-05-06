import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Button } from 'react-native'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import Typography from '../../components/Typography'

export default ({ profilePicturePath, name, isSelf }) => {
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
          {isSelf && (
            <Button
              title='Settings'
              onPress={() => {
                navigation.navigate('userSettings')
              }}
            />
          )}
        </View>
      </View>
      <Typography size='h1' style={{ marginTop: 40 }}>
        My Feed
      </Typography>
    </View>
  )
}
