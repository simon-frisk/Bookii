import React, { useContext, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../util/AuthProvider'
import { View } from 'react-native'
import TextField from '../components/TextField'
import Center from '../components/Center'
import ApolloError from '../components/ApolloError'
import Typography from '../components/Typography'
import PressButton from '../components/PressButton'

const Signin = gql`
  query Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`

export default () => {
  const [callQuery, { loading, error }] = useLazyQuery(Signin, {
    onCompleted: ({ signin: token }) => {
      setToken(token)
    },
  })
  const { signin: setToken } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signin = () => {
    callQuery({ variables: { email, password } })
  }

  return (
    <Center>
      <View style={{ width: '50%', maxWidth: 300 }}>
        <Typography size='h2'>Sign in</Typography>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder='email'
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          placeholder='password'
          secureTextEntry={true}
        />
        {error && <ApolloError type='errortext' error={error} />}
        <PressButton
          text='sign in'
          onPress={signin}
          loading={loading}
          type='filled'
          containerStyle={{ marginVertical: 10 }}
        />
      </View>
    </Center>
  )
}
