import NewPeoplePageQuery from '../graphql/NewPeoplePageQuery'
import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'

export default () => {
  const { data, loading, error } = useQuery(NewPeoplePageQuery)
  const errorMessage = useApolloError(error)
  return { data, loading, errorMessage }
}
