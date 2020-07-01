import PeoplePageQuery from '../graphql/PeoplePageQuery'
import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'

export default () => {
  const { data, loading, error } = useQuery(PeoplePageQuery)
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
