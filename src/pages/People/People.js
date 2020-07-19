import React from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import UserSlider from '../../components/UserSlider'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'
import useHeaderTitle from '../../util/useHeaderTitle'
import UserSearch from './UserSearch'
import PeoplePageQuery from '../../queries/PeoplePageQuery'
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

  const styles = useStyles()
  useHeaderTitle('People')

  return (
    <FlatList
      data={data && data.feed}
      keyExtractor={item => item._id}
      ListHeaderComponent={() => (
        <>
          <UserSearch />
          {!!data && (
            <>
              <Typography
                type='h2'
                style={{
                  paddingHorizontal: styles.standardMargin,
                  paddingTop: styles.standardMargin,
                }}
              >
                All users
              </Typography>
              <UserSlider users={data.users} />
              <Typography
                type='h2'
                style={{ paddingHorizontal: styles.standardMargin }}
              >
                Latest books
              </Typography>
            </>
          )}
        </>
      )}
      ListEmptyComponent={() => {
        if (loading)
          return (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          )
        if (errorMessage)
          return (
            <View style={styles.center}>
              <Typography style={{ color: styles.theme.current.error }}>
                {errorMessage}
              </Typography>
            </View>
          )
        return (
          <View style={styles.center}>
            <Typography>No books</Typography>
          </View>
        )
      }}
      renderItem={({ item }) => (
        <FeedBookCard
          feedBook={item}
          key={item._id}
          style={{ marginHorizontal: styles.standardMargin }}
        />
      )}
      onEndReached={getMoreData}
    />
  )
}
