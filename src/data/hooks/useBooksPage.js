import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import BooksPageQuery from '../graphql/BooksPageQuery'

export default () => {
  const { data, loading, error } = useQuery(BooksPageQuery)
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
