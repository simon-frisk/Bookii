import { useQuery } from '@apollo/react-hooks'
import UserPageQuery from '../graphql/UserPageQuery'
import useApolloError from '../../util/useApolloError'

export default ({ _id }) => {
  const { data, loading, error } = useQuery(UserPageQuery, {
    variables: { _id },
  })
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
