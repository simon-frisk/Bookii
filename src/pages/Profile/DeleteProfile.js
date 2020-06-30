import React, { useContext } from 'react'
import { Alert } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PressButton from '../../components/PressButton'
import { AuthContext } from '../../util/AuthProvider'
import useApolloError from '../../util/useApolloError'

const DeleteProfile = gql`
  mutation DeleteProfile {
    deleteUser {
      _id
    }
  }
`

export default ({ _id }) => {
  const [deleteAccount, { loading, error }] = useMutation(DeleteProfile, {
    onCompleted: () => signout(),
  })
  const errorMessage = useApolloError(error)
  const { signout } = useContext(AuthContext)

  const showAlert = () => {
    Alert.alert(
      'Delete account',
      'This will remove your account and all data. This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ]
    )
  }

  return (
    <>
      <PressButton
        text='Delete account'
        type='error'
        loading={loading}
        onPress={showAlert}
      />
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </>
  )
}
