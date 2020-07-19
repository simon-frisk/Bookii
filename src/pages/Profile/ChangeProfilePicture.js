import React, { useState } from 'react'
import PressButton from '../../components/PressButton'
import * as ImagePicker from 'expo-image-picker'
import { ReactNativeFile } from 'apollo-upload-client'
import { View } from 'react-native'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'
import useTheme from '../../util/useTheme'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import useStyles from '../../util/useStyles'

const ChangeProfilePicture = gql`
  mutation ChangeProfilePicture($profilePicture: Upload) {
    changeProfilePicture(profilePicture: $profilePicture) {
      _id
      profilePicturePath
    }
  }
`

export default ({ profilePicturePath: initialProfilePicturePath, name }) => {
  const [callMutation, { loading, error }] = useMutation(ChangeProfilePicture)
  const errorMessage = useApolloError(error)
  const [profilePicture, setProfilePicture] = useState()
  const [profilePicturePath, setProfilePicturePath] = useState(
    initialProfilePicturePath
  )
  const theme = useTheme()
  const styles = useStyles()

  const save = () => {
    callMutation({ variables: { profilePicture } })
  }

  const selectProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.cancelled) {
      const picture = new ReactNativeFile({
        uri: result.uri,
        name: 'profilePicture',
        type: 'image/jpeg',
      })
      setProfilePicture(picture)
      setProfilePicturePath(result.uri)
    }
  }

  return (
    <View
      style={{
        marginHorizontal: styles.standardMargin,
        marginTop: styles.standardMargin,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={80}
          name={name}
        />
        <PressButton text='Select' onPress={selectProfilePicture} />
        <PressButton
          text='Remove'
          onPress={() => {
            setProfilePicture()
            setProfilePicturePath()
          }}
          color={theme.current.error}
        />
      </View>
      {error && (
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        text='Save profilepicture'
        onPress={save}
        color={theme.current.main}
        loading={loading}
      />
    </View>
  )
}
