import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'react-native'
import ApolloError from '../../components/ApolloError'
import { UserFollowingAndFollowers } from '../UserSettings/UserSettings'
import { UserPage } from './User'
import { FeedPage } from '../Feed'

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

  if (error) return <ApolloError error={error} type='errortext' />

  return (
    <Button
      title={isSelfFollowing ? 'Unfollow' : 'Follow'}
      onPress={callMutation}
      disabled={loading}
    />
  )
}
