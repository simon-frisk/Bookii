import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { UserFollowingAndFollowers } from '../Profile/Profile'
import UserPageQuery from '../../data/graphql/UserPageQuery'
import PressButton from '../../components/PressButton'
import useApolloError from '../../util/useApolloError'
import { Text } from 'react-native'
import NewPeoplePageQuery from '../../data/graphql/NewPeoplePageQuery'

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
        { query: UserPageQuery, variables: { _id } },
        { query: NewPeoplePageQuery },
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
