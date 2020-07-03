import React from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import useStyles from '../../util/useStyles'
import FeedBookSlider from '../../components/FeedBook/FeedBookSlider'
import WishButton from './WishButton'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/Book/BookCover'
import PressButton from '../../components/PressButton'
import useBookPage from '../../data/hooks/useBookPage'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

export default ({ route }) => {
  const Styles = useStyles()
  const theme = useTheme()
  const { data, loading, errorMessage } = useBookPage({
    bookId: route.params.bookId,
  })

  const navigation = useNavigation()

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (errorMessage)
    return (
      <View style={Styles.center}>
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      </View>
    )

  if (data && !data.book)
    return (
      <View style={Styles.center}>
        <Typography>Book not found</Typography>
      </View>
    )

  if (data && data.book)
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: Styles.standardPageInset }}
      >
        <View style={{ padding: Styles.standardPageInset }}>
          <View style={{ marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <BookCover
                uri={data.book.thumbnail}
                width={200}
                title={data.book.title}
              />
              <Typography
                type='h2'
                style={{ marginTop: 15, textAlign: 'center' }}
              >
                {data.book.title}
              </Typography>
              {!!data.book.subTitle && (
                <Typography style={{ textAlign: 'center', color: 'grey' }}>
                  {data.book.subTitle}
                </Typography>
              )}
            </View>
            <PressButton
              text={
                'Add book' + (!!data.book.onselffeed.length ? ' again' : '')
              }
              onPress={() =>
                navigation.navigate('addFeedBook', { bookId: data.book.bookId })
              }
              color={theme.current.main}
            />
            <WishButton
              bookId={data.book.bookId}
              isWished={data.book.isWished}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            {!!data.book.authors && (
              <Typography style={{ color: 'grey' }}>{`Author${
                data.book.authors.length > 1 ? 's' : ''
              }: ${data.book.authors.join(' , ')}`}</Typography>
            )}
            {!!data.book.pages && (
              <Typography style={{ color: 'grey' }}>
                Pages: {data.book.pages}
              </Typography>
            )}
            {!!data.book.published && (
              <Typography style={{ color: 'grey' }}>
                Published: {data.book.published}
              </Typography>
            )}
            {!!data.book.publisher && (
              <Typography style={{ color: 'grey' }}>
                Publisher: {data.book.publisher}
              </Typography>
            )}
          </View>
          {!!data.book.wikipediadescription && (
            <View style={[Styles.card, { padding: 20 }]}>
              <Typography type='h3'>Wikipedia</Typography>
              <Typography>{data.book.wikipediadescription}</Typography>
            </View>
          )}
        </View>
        {!!data.book.onselffeed.length && (
          <FeedBookSlider
            feedBooks={data.book.onselffeed}
            isSelf={true}
            title='On your feed'
          />
        )}
        {!!data.book.onfollowingfeed.length && (
          <FeedBookSlider
            feedBooks={data.book.onfollowingfeed}
            title='On following feeds'
          />
        )}
      </ScrollView>
    )
}
