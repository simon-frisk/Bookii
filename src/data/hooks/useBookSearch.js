import { useLazyQuery } from '@apollo/react-hooks'
import BookSearchQuery from '../graphql/BookSearchQuery'
import useApolloError from '../../util/useApolloError'

export default () => {
  const [callQuery, { data, loading, error }] = useLazyQuery(BookSearchQuery)
  const errorMessage = useApolloError(error)
  return { callQuery, data, loading, errorMessage }
}
