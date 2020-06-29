import { useLazyQuery } from '@apollo/react-hooks'
import SearchPageQuery from '../graphql/SearchPageQuery'
import useApolloError from '../../util/useApolloError'

export default () => {
  const [callQuery, { data, loading, error }] = useLazyQuery(SearchPageQuery)
  const errorMessage = useApolloError(error)
  return { callQuery, data, loading, errorMessage }
}
