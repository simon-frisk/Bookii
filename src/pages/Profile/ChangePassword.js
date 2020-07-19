import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import PressButton from '../../components/PressButton'
import gql from 'graphql-tag'
import Typography from '../../components/Typography'
import useStyles from '../../util/useStyles'

const ChangePassword = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`

export default () => {
  const [callMutation, { data, loading, error }] = useMutation(ChangePassword)
  const errorMessage = useApolloError(error)
  const [password, setPassword] = useState('')
  const styles = useStyles()

  const updatePassword = () => {
    callMutation({ variables: { password } })
  }

  useEffect(() => {
    setPassword('')
  }, [data])

  return (
    <View
      style={{
        paddingTop: styles.doubleMargin,
        paddingHorizontal: styles.standardMargin,
      }}
    >
      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder='Enter new password'
        secureTextEntry={true}
      />
      {error && (
        <Typography style={{ color: styles.theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        loading={loading}
        text='Save password'
        onPress={updatePassword}
      />
    </View>
  )
}
