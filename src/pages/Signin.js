import React, { useContext, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { UserContext } from '../util/UserProvider'
import { View } from 'react-native'
import TextField from '../components/TextField'
import useApolloError from '../util/useApolloError'
import PressButton from '../components/PressButton'
import useStyles from '../util/useStyles'
import Typography from '../components/Typography'
import useTheme from '../util/useTheme'

const Signin = gql`
  query Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`

export default () => {
  const Styles = useStyles()
  const theme = useTheme()

  const [callQuery, { loading, error }] = useLazyQuery(Signin, {
    onCompleted: ({ signin: token }) => {
      setToken(token)
    },
  })
  const errorMessage = useApolloError(error)

  const { signin: setToken } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signin = () => {
    callQuery({ variables: { email, password } })
  }

  return (
    <View style={Styles.center}>
      <View style={{ width: '65%', maxWidth: 300 }}>
        <Typography type='h2'>Sign in</Typography>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder='email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          placeholder='password'
          secureTextEntry={true}
          textContentType='password'
        />
        {error && (
          <Typography style={{ color: theme.current.error }}>
            {errorMessage}
          </Typography>
        )}
        <PressButton
          text='sign in'
          onPress={signin}
          loading={loading}
          color={theme.current.main}
          containerStyle={{ marginVertical: 10 }}
        />
      </View>
    </View>
  )
}
