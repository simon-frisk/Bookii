import React from 'react'
import { ScrollView, ActivityIndicator, View, FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import usePeoplePage from '../../data/hooks/usePeoplePage'
import useTheme from '../../util/useTheme'
import UserSlider from '../../components/UserSlider'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'
import useHeaderTitle from '../../util/useHeaderTitle'

export default () => {
  const { data, loading, errorMessage } = usePeoplePage()
  const styles = useStyles()
  const theme = useTheme()
  useHeaderTitle('People')

  return (
    <ScrollView contentContainerStyle={{ padding: styles.standardPageInset }}>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
      {errorMessage && (
        <View style={styles.center}>
          <Typography style={{ color: theme.current.error }}>
            {errorMessage}
          </Typography>
        </View>
      )}
      {data && (
        <>
          <Typography type='h2'>All users</Typography>
          <UserSlider users={data.users} />
          <Typography type='h2'>Feed</Typography>
          <FlatList
            data={data.feed}
            keyExtractor={({ _id }, index) => _id + index}
            renderItem={({ item }) => <FeedBookCard feedBook={item} />}
          />
        </>
      )}
    </ScrollView>
  )
}
