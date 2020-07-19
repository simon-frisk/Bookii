import React from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import useStyles from '../../util/useStyles'
import WishButton from './WishButton'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/Book/BookCover'
import PressButton from '../../components/PressButton'
import Typography from '../../components/Typography'
import ExpandableText from '../../components/ExpandableText'
import FeedBookCard from '../../components/FeedBook/FeedBookCard'
import YoutubeVideos from './YoutubeVideos'
import { useQuery } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import BookPageQuery from '../../queries/BookPageQuery'

export default ({ route }) => {
  const { data, loading, error } = useQuery(BookPageQuery, {
    variables: { bookId: route.params.bookId },
  })
  const errorMessage = useApolloError(error)

  const Styles = useStyles()
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
        <Typography style={{ color: Styles.theme.current.error }}>
          {errorMessage}
        </Typography>
      </View>
    )

  if (data)
    return (
      <ScrollView>
        <View style={{ padding: Styles.standardMargin }}>
          <View style={{ alignItems: 'center' }}>
            <BookCover
              uri={data.book.thumbnail}
              width={200}
              title={data.book.title}
            />
            <View style={{ marginVertical: Styles.standardMargin / 2 }}>
              <Typography
                type='h2'
                style={{
                  textAlign: 'center',
                }}
              >
                {data.book.title}
              </Typography>
              {!!data.book.subTitle && (
                <Typography style={{ textAlign: 'center', color: 'grey' }}>
                  {data.book.subTitle}
                </Typography>
              )}
            </View>
          </View>
          <PressButton
            text={'Add book' + (!!data.book.onselffeed.length ? ' again' : '')}
            onPress={() =>
              navigation.navigate('addFeedBook', { bookId: data.book.bookId })
            }
            color={Styles.theme.current.main}
          />
          <WishButton bookId={data.book.bookId} isWished={data.book.isWished} />
        </View>
        <View style={{ marginHorizontal: Styles.standardMargin }}>
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
        {!!data.book.description && (
          <View
            style={[
              Styles.card,
              {
                marginTop: Styles.standardMargin,
                marginHorizontal: Styles.standardMargin,
              },
            ]}
          >
            <Typography type='h3'>Description</Typography>
            <ExpandableText text={data.book.description} extractLength={200} />
          </View>
        )}
        {!!data.book.wikipediadescription && (
          <View
            style={[
              Styles.card,
              {
                marginTop: Styles.standardMargin,
                marginHorizontal: Styles.standardMargin,
              },
            ]}
          >
            <Typography type='h3'>Wikipedia</Typography>
            <ExpandableText
              text={data.book.wikipediadescription}
              extractLength={200}
            />
          </View>
        )}
        {!!data.book.youtubevideos.length && (
          <YoutubeVideos videoIds={data.book.youtubevideos} />
        )}
        <View
          style={{
            marginHorizontal: Styles.standardMargin,
            marginVertical: Styles.standardMargin / 2,
          }}
        >
          {data.book.onselffeed.map(feedBook => (
            <FeedBookCard
              feedBook={feedBook}
              key={feedBook._id}
              isSelf={true}
            />
          ))}
          {data.book.onfollowingfeed.map(feedBook => (
            <FeedBookCard feedBook={feedBook} key={feedBook._id} />
          ))}
        </View>
      </ScrollView>
    )
}
