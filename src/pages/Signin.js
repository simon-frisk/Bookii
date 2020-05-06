import React, { useContext, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../util/AuthProvider'
import TextField from '../components/TextField'
import Center from '../components/Center'
import ApolloError from '../components/ApolloError'
import Typography from '../components/Typography'

const Signin = gql`
  query Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`

export default () => {
  const [callSigninQuery, { data, loading, error }] = useLazyQuery(Signin)
  const { signin: setToken } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signin = () => {
    callSigninQuery({ variables: { email, password } })
  }

  useEffect(() => {
    if (data && data.signin) setToken(data.signin)
  }, [data])

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
        <Button title='sign in' onPress={signin} disabled={loading} />
      </View>
    </Center>
  )
}
