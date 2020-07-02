import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useApolloError from '../util/useApolloError'
import * as Segment from 'expo-analytics-segment'

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
  const [callIdentifyUser, { error }] = useLazyQuery(IdentifyUser, {
    onCompleted(data) {
      Segment.identifyWithTraits(data.user._id, {
        email: data.user.email,
        name: data.user.name,
      })
    },
  })
  useApolloError(error)

  return {
    callIdentifyUser,
  }
}
