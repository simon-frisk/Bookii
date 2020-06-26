import React, { useContext } from 'react'
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

  return (
    <>
      <PressButton
        text='Delete profile'
        type='error'
        loading={loading}
        onPress={deleteAccount}
      />
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </>
  )
}
