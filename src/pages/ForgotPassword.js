import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import Typography from '../components/Typography'
import useStyles from '../util/useStyles'
import TextField from '../components/TextField'
import PressButton from '../components/PressButton'
import ForgotPassword from '../data/graphql/ForgotPassword'
import useApolloError from '../util/useApolloError'

export default () => {
  const styles = useStyles()
  const [email, setEmail] = useState('')

  const [callQuery, { data, loading, error }] = useLazyQuery(ForgotPassword)
  const errorMessage = useApolloError(error)

  useEffect(() => setEmail(''), [data])

  return (
    <ScrollView contentContainerStyle={{ padding: styles.standardMargin }}>
      <Typography type='h2'>Forgot password</Typography>
      <Typography style={{ marginVertical: 5 }}>
        You can reset your old password and get a new one by email.
      </Typography>
      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder='email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      {data && (
        <Typography>
          Password has been reset. You will get an email with a new password.
        </Typography>
      )}
      {error && (
        <Typography style={{ color: styles.theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        text='Get new password'
        color={styles.theme.current.main}
        loading={loading}
        onPress={() => callQuery({ variables: { email } })}
      />
    </ScrollView>
  )
}
