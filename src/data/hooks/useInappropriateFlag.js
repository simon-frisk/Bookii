import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import InapproppriateFlagMutation from '../graphql/InapproppriateFlagMutation'
import UserPageQuery from '../graphql/UserPageQuery'

export default ({ _id }) => {
  const [callMutation, { loading, error, data }] = useMutation(
    InapproppriateFlagMutation,
    {
      variables: { _id },
      refetchQueries: [{ query: UserPageQuery, variables: { _id } }],
    }
  )
  const errorMessage = useApolloError(error)
  return { callMutation, loading, errorMessage, data }
}
