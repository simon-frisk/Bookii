import React from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import usePeoplePage from '../../data/hooks/usePeoplePage'
import useTheme from '../../util/useTheme'
import UserSlider from '../../components/UserSlider'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'
import useHeaderTitle from '../../util/useHeaderTitle'
import UserSearch from './UserSearch'

export default () => {
  const { data, loading, errorMessage, getMoreData } = usePeoplePage()
  const styles = useStyles()
  const theme = useTheme()
  useHeaderTitle('People')

  return (
    <FlatList
      data={data && data.feed}
      keyExtractor={item => item._id}
      ListHeaderComponent={() => (
        <>
          {!!data && (
            <>
              <UserSearch />
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
              <Typography style={{ color: theme.current.error }}>
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
