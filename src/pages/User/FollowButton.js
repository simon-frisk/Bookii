import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { UserFollowingAndFollowers } from '../Profile/Profile'
import UserPageQuery from '../../data/graphql/UserPageQuery'
import PressButton from '../../components/PressButton'
import useApolloError from '../../util/useApolloError'
import PeoplePageQuery from '../../data/graphql/PeoplePageQuery'
import useTheme from '../../util/useTheme'
import Typography from '../../components/Typography'

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
        { query: PeoplePageQuery },
        { query: UserFollowingAndFollowers },
      ],
    }
  )
  const errorMessage = useApolloError(error)
  const theme = useTheme()

  if (error)
    return (
      <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
    )

  return (
    <PressButton
      text={isSelfFollowing ? 'Unfollow' : 'Follow'}
      onPress={callMutation}
      loading={loading}
    />
  )
}
