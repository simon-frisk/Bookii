import React, { useContext } from 'react'
import { Alert } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PressButton from '../../components/PressButton'
import { UserContext } from '../../util/UserProvider'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

const DeleteProfile = gql`
  mutation DeleteProfile {
    deleteUser {
      _id
    }
  }
`

export default () => {
  const [deleteAccount, { loading, error }] = useMutation(DeleteProfile, {
    onCompleted: () => signout(),
  })
  const errorMessage = useApolloError(error)
  const { signout } = useContext(UserContext)
  const theme = useTheme()

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
        color={theme.current.error}
        loading={loading}
        onPress={showAlert}
      />
      {error && (
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
    </>
  )
}
