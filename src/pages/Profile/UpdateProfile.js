import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useMutation } from '@apollo/react-hooks'
import { ReactNativeFile } from 'apollo-upload-client'
import * as Segment from 'expo-analytics-segment'
import gql from 'graphql-tag'
import TextField from '../../components/TextField'
import PressButton from '../../components/PressButton'
import Styles from '../../util/Styles'
import useApolloError from '../../util/useApolloError'
import ProfilePictureCircle from '../../components/ProfilePictureCircle'

const UpdateUser = gql`
  mutation UpdateUser($name: String, $email: String, $profilePicture: Upload) {
    updateUser(
      user: { email: $email, name: $name, profilePicture: $profilePicture }
    ) {
      _id
      email
      name
      profilePicturePath
    }
  }
`

export default ({
  email: initialEmail,
  name: initialName,
  profilePicturePath: initialProfilePicturePath,
}) => {
  const [callMutation, { loading, error }] = useMutation(UpdateUser, {
    onCompleted(data) {
      Segment.identifyWithTraits(data.updateUser._id, {
        email: data.updateUser.email,
        name: data.updateUser.name,
      })
    },
  })
  const errorMessage = useApolloError(error)

  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [profilePicture, setProfilePicture] = useState()
  const [profilePicturePath, setProfilePicturePath] = useState(
    initialProfilePicturePath
  )

  const update = () => {
    callMutation({ variables: { name, email, profilePicture } })
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
    <View style={{ marginBottom: 35, marginTop: 10 }}>
      <Text style={Styles.h2}>Update profile</Text>
      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder='email'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextField value={name} onChangeText={setName} placeholder='name' />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <PressButton
          text='Select profile picture'
          onPress={selectProfilePicture}
        />
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          size={50}
          name={name}
        />
      </View>
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <PressButton
        text='Update'
        onPress={update}
        type='filled'
        loading={loading}
      />
    </View>
  )
}
