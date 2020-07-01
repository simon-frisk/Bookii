import React from 'react'
import { ScrollView, ActivityIndicator, View, FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import Typography from '../../components/Typography'
import usePeoplePage from '../../data/hooks/usePeoplePage'
import useTheme from '../../util/useTheme'
import UserSlider from '../../components/UserSlider'
import FeedBookUserCard from '../../components/bookcard/FeedBookUserCard/FeedBookUserCard'

export default () => {
  const { data, loading, errorMessage } = usePeoplePage()
  const styles = useStyles()
  const theme = useTheme()

  return (
    <ScrollView contentContainerStyle={{ padding: styles.standardPageInset }}>
      <Typography type='h1' style={{ marginBottom: 30 }}>
        People
      </Typography>
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
      {errorMessage && (
        <View style={styles.center}>
          <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
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
            renderItem={({ item }) => (
              <FeedBookUserCard
                book_id={item._id}
                bookId={item.bookId}
                comment={item.comment}
                date={item.date}
                thumbnail={item.book.thumbnail}
                title={item.book.title}
                user_id={item.user._id}
                name={item.user.name}
                profilePicturePath={item.user.profilePicturePath}
              />
            )}
          />
        </>
      )}
    </ScrollView>
  )
}
