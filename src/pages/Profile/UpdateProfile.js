import React, { useState } from 'react'
import { View } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import * as Segment from 'expo-analytics-segment'
import gql from 'graphql-tag'
import TextField from '../../components/TextField'
import PressButton from '../../components/PressButton'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

const UpdateUser = gql`
  mutation UpdateUser($name: String!, $email: String!) {
    updateUser(email: $email, name: $name) {
      _id
      email
      name
    }
  }
`

export default ({ email: initialEmail, name: initialName }) => {
  const [callMutation, { loading, error }] = useMutation(UpdateUser, {
    onCompleted(data) {
      Segment.identifyWithTraits(data.updateUser._id, {
        email: data.updateUser.email,
        name: data.updateUser.name,
      })
    },
  })
  const errorMessage = useApolloError(error)
  const theme = useTheme()

  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)

  const update = () => {
    callMutation({ variables: { name, email } })
  }

  return (
    <View>
      <TextField
        value={email}
        onChangeText={setEmail}
        placeholder='email'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextField value={name} onChangeText={setName} placeholder='name' />
      {error && (
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        text='Save email and name'
        onPress={update}
        loading={loading}
      />
    </View>
  )
}
