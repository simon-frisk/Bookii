import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PressButton from '../../components/PressButton'
import ApolloError from '../../components/ApolloError'
import { AuthContext } from '../../util/AuthProvider'

const DeleteProfile = gql`
  mutation DeleteProfile($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`

export default ({ _id }) => {
  const [deleteAccount, { loading, error }] = useMutation(DeleteProfile, {
    variables: { _id },
    onCompleted: () => signout(),
  })
  const { signout } = useContext(AuthContext)

  return (
    <>
      <PressButton
        text='Delete profile'
        type='error'
        loading={loading}
        onPress={deleteAccount}
      />
      {error && <ApolloError error={error} type='errortext' />}
    </>
  )
}
