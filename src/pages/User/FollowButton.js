import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { UserFollowingAndFollowers } from '../Profile/Profile'
import UserPage from './UserQuery'
import { FeedPage } from '../Feed'
import PressButton from '../../components/PressButton'
import useApolloError from '../../util/useApolloError'

const FollowUser = gql`
  mutation FollowUser($_id: ID!) {
    follow(_id: $_id) {
      _id
    }
  }
`

const UnFollowUser = gql`
  mutation UnFollowUser($_id: ID!) {
    unfollow(_id: $_id) {
      _id
    }
  }
`

export default ({ isSelfFollowing, _id }) => {
  const [callMutation, { loading, error }] = useMutation(
    isSelfFollowing ? UnFollowUser : FollowUser,
    {
      variables: { _id },
      refetchQueries: [
        { query: UserPage, variables: { _id } },
        { query: FeedPage },
        { query: UserFollowingAndFollowers },
      ],
    }
  )
  const errorMessage = useApolloError(error)

  if (error) return <Text style={{ color: 'red' }}>{errorMessage}</Text>

  return (
    <PressButton
      text={isSelfFollowing ? 'Unfollow' : 'Follow'}
      onPress={callMutation}
      loading={loading}
    />
  )
}
