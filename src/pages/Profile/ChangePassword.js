import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import PressButton from '../../components/PressButton'
import gql from 'graphql-tag'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

const ChangePassword = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`

export default () => {
  const [callMutation, { data, loading, error }] = useMutation(ChangePassword)
  const errorMessage = useApolloError(error)
  const [password, setPassword] = useState('')
  const theme = useTheme()

  const updatePassword = () => {
    callMutation({ variables: { password } })
  }

  useEffect(() => {
    setPassword('')
  }, [data])

  return (
    <View style={{ paddingVertical: 30 }}>
      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder='Enter new password'
        secureTextEntry={true}
      />
      {error && (
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        loading={loading}
        text='Change password'
        onPress={updatePassword}
      />
    </View>
  )
}
