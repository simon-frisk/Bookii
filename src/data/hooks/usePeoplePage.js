import PeoplePageQuery from '../graphql/PeoplePageQuery'
import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'

export default () => {
  const { data, loading, error, fetchMore } = useQuery(PeoplePageQuery)
  const errorMessage = useApolloError(error)

  function getMoreData() {
    fetchMore({
      query: PeoplePageQuery,
      variables: { after: data.feed[data.feed.length - 1]._id },
      updateQuery(prev, { fetchMoreResult }) {
        return {
          ...prev,
          feed: [...prev.feed, ...fetchMoreResult.feed],
        }
      },
    })
  }

  return { data, loading, errorMessage, getMoreData }
}
