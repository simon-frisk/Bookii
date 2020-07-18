import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Link } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser'
import CheckBox from 'react-native-check-box'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as Segment from 'expo-analytics-segment'
import { UserContext } from '../root/UserProvider'
import TextField from '../components/TextField'
import useApolloError from '../util/useApolloError'
import PressButton from '../components/PressButton'
import useStyles from '../util/useStyles'
import Typography from '../components/Typography'
import useTheme from '../util/useTheme'

const Signup = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
    $latestConsent: Boolean!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      latestConsent: $latestConsent
    )
  }
`

export default () => {
  const Styles = useStyles()
  const theme = useTheme()

  const [callMutation, { loading, error }] = useMutation(Signup, {
    onCompleted: ({ signup: token }) => {
      Segment.track('Account created')
      setToken(token)
    },
  })
  const errorMessage = useApolloError(error)

  const { signin: setToken } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [latestConsent, setLatestConsent] = useState(false)

  const signup = () => {
    callMutation({ variables: { email, password, name, latestConsent } })
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
          textContentType='emailAddress'
        />
        <TextField
          value={name}
          onChangeText={setName}
          placeholder='full name'
          textContentType='name'
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          placeholder='password'
          secureTextEntry={true}
          textContentType='newPassword'
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography style={{ flex: 1, marginRight: 5 }}>
            I have read and agree with the{' '}
            <Typography
              style={{ color: theme.current.main }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  'https://bookii.simonfrisk.com/privacypolicy'
                )
              }
            >
              privacy policy
            </Typography>
          </Typography>
          <CheckBox
            isChecked={latestConsent}
            onClick={() => setLatestConsent(!latestConsent)}
            leftTextStyle={{ color: theme.current.text, fontSize: 16 }}
            checkBoxColor={theme.current.text}
          />
        </View>
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
          <Link to='/signin' style={{ color: theme.current.main }}>
            Sign in!
          </Link>
        </Typography>
      </View>
    </View>
  )
}
