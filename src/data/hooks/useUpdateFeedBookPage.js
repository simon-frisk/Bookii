import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import UpdateFeedBookPageQuery from '../graphql/UpdateFeedBookPageQuery'

export default ({ _id }) => {
  const { data, loading, error } = useQuery(UpdateFeedBookPageQuery, {
    variables: { _id },
  })
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
