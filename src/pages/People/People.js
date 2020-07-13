import React from 'react'
import { ActivityIndicator, View, FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import usePeoplePage from '../../data/hooks/usePeoplePage'
import useTheme from '../../util/useTheme'
import UserSlider from '../../components/UserSlider'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'
import useHeaderTitle from '../../util/useHeaderTitle'

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
          <Typography
            type='h2'
            style={{ paddingHorizontal: styles.standardPageInset }}
          >
            All users
          </Typography>
          {!!data && <UserSlider users={data.users} />}
          <Typography
            type='h2'
            style={{ paddingHorizontal: styles.standardPageInset }}
          >
            Feed
          </Typography>
        </>
      )}
      ListEmptyComponent={() => {
        if (loading)
          return (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          )
        if (error)
          return (
            <View style={styles.center}>
              <Typography style={{ color: theme.current.error }}>
                {errorMessage}
              </Typography>
            </View>
          )
      }}
      renderItem={({ item }) => (
        <FeedBookCard
          feedBook={item}
          key={item._id}
          style={{ marginHorizontal: styles.standardPageInset }}
        />
      )}
      onEndReached={getMoreData}
    />
  )
}
