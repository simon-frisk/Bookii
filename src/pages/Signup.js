import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Link } from '@react-navigation/native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as Segment from 'expo-analytics-segment'
import { AuthContext } from '../util/AuthProvider'
import TextField from '../components/TextField'
import useApolloError from '../util/useApolloError'
import PressButton from '../components/PressButton'
import useStyles from '../util/useStyles'
import Typography from '../components/Typography'
import useTheme from '../util/useTheme'

const Signup = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(user: { email: $email, name: $name, password: $password })
  }
`

export default () => {
  const [callMutation, { loading, error }] = useMutation(Signup, {
    onCompleted: ({ signup: token }) => {
      Segment.track('Account created')
      setToken(token)
    },
  })
  const errorMessage = useApolloError(error)
  const Styles = useStyles()
  const theme = useTheme()

  const { signin: setToken } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const signup = () => {
    callMutation({ variables: { email, password, name } })
  }

  return (
    <View style={Styles.center}>
      <View style={{ width: '65%', maxWidth: 300 }}>
        <Typography type='h2'>Sign up</Typography>
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
        {error && (
          <Typography style={{ color: theme.current.error }}>
            {errorMessage}
          </Typography>
        )}
        <PressButton
          text='sign up'
          onPress={signup}
          loading={loading}
          color={theme.current.main}
        />
        <Typography>
          Already have an account?{' '}
          <Link to='/signin' style={{ color: 'blue' }}>
            Sign in!
          </Link>
        </Typography>
      </View>
    </View>
  )
}
