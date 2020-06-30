import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import TopListsPageQuery from '../graphql/TopListsPageQuery'

export default () => {
  const { data, loading, error } = useQuery(TopListsPageQuery)
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
