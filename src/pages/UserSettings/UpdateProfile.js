import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useMutation } from '@apollo/react-hooks'
import { ReactNativeFile } from 'apollo-upload-client'
import gql from 'graphql-tag'
import TextField from '../../components/TextField'
import ApolloError from '../../components/ApolloError'
import PressButton from '../../components/PressButton'
import Styles from '../../util/Styles'

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
      <Text style={Styles.h3}>Update profile</Text>
      <Text>Enter the values you want to change</Text>
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
