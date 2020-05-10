import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ApolloError from '../../components/ApolloError'
import Typography from '../../components/Typography'
import { ReactNativeFile } from 'apollo-upload-client'
import PressButton from '../../components/PressButton'

const UpdateUser = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $password: String
    $profilePicture: Upload
  ) {
    updateUser(
      user: {
        email: $email
        name: $name
        password: $password
        profilePicture: $profilePicture
      }
    ) {
      _id
      email
      name
    }
  }
`

export default () => {
  const [callMutation, { data, loading, error }] = useMutation(UpdateUser)

  useEffect(() => {
    if (data) {
      setName()
      setEmail()
      setPassword()
      setProfilePicture()
    }
  }, [data])

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [profilePicture, setProfilePicture] = useState()

  const update = () => {
    callMutation({ variables: { name, email, password, profilePicture } })
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
    }
  }

  return (
    <View>
      <Typography size='h3'>Update profile</Typography>
      <Typography>Enter the values you want to change</Typography>
      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder='email'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextField value={name} onChangeText={setName} placeholder='name' />
      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder='password'
        secureTextEntry={true}
      />
      <PressButton
        text='Select profile picture'
        type='outline'
        onPress={selectProfilePicture}
      />
      {error && <ApolloError type='errortext' error={error} />}
      <PressButton
        text='Update'
        onPress={update}
        type='filled'
        loading={loading}
      />
    </View>
  )
}
