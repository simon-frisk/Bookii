import { useLazyQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'
import gql from 'graphql-tag'
import useApolloError from './useApolloError'

const IdentifyUser = gql`
  query IdentifyUserQuery($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      email
    }
  }
`

export default () => {
  const [callIdentifyUser, { data, error }] = useLazyQuery(IdentifyUser, {
    onCompleted(data) {
      console.log(data)
      Segment.identifyWithTraits(data.user._id, {
        email: data.user.email,
        name: data.user.name,
      })
    },
  })
  useApolloError(error)

  useEffect(() => {
    callIdentifyUser()
  }, [])

  return {
    callIdentifyUser,
    hasIdentifiedUser: !!data || !!error,
  }
}
