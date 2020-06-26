import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import Styles from '../../util/Styles'
import TextField from '../../components/TextField'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import PressButton from '../../components/PressButton'
import gql from 'graphql-tag'

const UpdatePassword = gql`
  mutation UpdateUser($password: String!) {
    updateUser(user: { password: $password }) {
      _id
    }
  }
`

export default () => {
  const [callMutation, { data, loading, error }] = useMutation(UpdatePassword)
  const errorMessage = useApolloError(error)
  const [password, setPassword] = useState()

  const updatePassword = () => {
    callMutation({ variables: { password } })
  }

  useEffect(() => {
    setPassword()
  }, [data])

  return (
    <View style={{ marginBottom: 35 }}>
      <Text style={Styles.h2}>Change password</Text>
      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder='Enter new password'
        secureTextEntry={true}
      />
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <PressButton
        loading={loading}
        text='Change password'
        type='filled'
        onPress={updatePassword}
      />
    </View>
  )
}
