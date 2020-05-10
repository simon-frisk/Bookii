import React, { useContext, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../util/AuthProvider'
import TextField from '../components/TextField'
import Center from '../components/Center'
import ApolloError from '../components/ApolloError'
import Typography from '../components/Typography'

const Signup = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(user: { email: $email, name: $name, password: $password })
  }
`

export default () => {
  const [callMutation, { loading, error }] = useMutation(Signup, {
    onCompleted: ({ signup: token }) => {
      setToken(token)
    },
  })
  const { signin: setToken } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const signup = () => {
    callMutation({ variables: { email, password, name } })
  }

  return (
    <Center>
      <View style={{ width: '50%', maxWidth: 300 }}>
        <Typography size='h2'>Sign up</Typography>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder='email'
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <TextField
          value={name}
          onChangeText={setName}
          placeholder='full name'
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          placeholder='password'
          secureTextEntry={true}
        />
        {error && <ApolloError type='errortext' error={error} />}
        <Button title='sign up' onPress={signup} disabled={loading} />
      </View>
    </Center>
  )
}