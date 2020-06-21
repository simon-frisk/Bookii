import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Link } from '@react-navigation/native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../util/AuthProvider'
import TextField from '../components/TextField'
import ApolloError from '../components/ApolloError'
import PressButton from '../components/PressButton'
import Styles from '../util/Styles'

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
    <View style={Styles.center}>
      <View style={{ width: '50%', maxWidth: 300 }}>
        <Text style={Styles.h2}>Sign up</Text>
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
        <PressButton
          text='sign up'
          onPress={signup}
          loading={loading}
          type='filled'
        />
        <Text>
          Already have an account?{' '}
          <Link to='/signin' style={{ color: 'blue' }}>
            Sign in!
          </Link>
        </Text>
      </View>
    </View>
  )
}
