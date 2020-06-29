import { useQuery } from '@apollo/react-hooks'
import BookPageQuery from '../graphql/BookPageQuery'
import useApolloError from '../../util/useApolloError'

export default ({ bookId }) => {
  const { data, loading, error } = useQuery(BookPageQuery, {
    variables: { bookId },
  })
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
