import { useMutation } from '@apollo/react-hooks'
import AcceptLatestPolicies from '../graphql/AcceptLatestPolicies'
import useApolloError from '../../util/useApolloError'

export default () => {
  const [callAcceptLatestPolicies, { data, loading, error }] = useMutation(
    AcceptLatestPolicies
  )
  const errorMessage = useApolloError(error)
  return { callAcceptLatestPolicies, data, loading, errorMessage }
}
