import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import BookListsQuery from '../graphql/BookListsQuery'

export default () => {
  const { data, loading, error } = useQuery(BookListsQuery)
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
