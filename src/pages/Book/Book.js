import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
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
import ErrorCenter from '../../components/ErrorCenter'

export default ({ route }) => {
  const { data, loading, error } = useQuery(BookPageQuery, {
    variables: { bookId: route.params.bookId },
  })
  const errorMessage = useApolloError(error)

  const Styles = useStyles()
  const navigation = useNavigation()

  if (errorMessage) return <ErrorCenter message={errorMessage} />

  return (
    <ScrollView>
      <View style={{ padding: Styles.standardMargin }}>
        <View style={{ alignItems: 'center' }}>
          <BookCover
            loading={loading}
            width={200}
            uri={data && data.book.thumbnail}
            title={data && data.book.title}
            style={{ marginBottom: Styles.standardMargin / 2 }}
          />
          {data && (
            <View>
              <Typography
                type='h2'
                style={{
                  textAlign: 'center',
                }}
              >
                {data.book.title}
              </Typography>
              {!!data.book.subtitle && (
                <Typography style={{ textAlign: 'center', color: 'grey' }}>
                  {data.book.subtitle}
                </Typography>
              )}
            </View>
          )}
        </View>
        {data && (
          <>
            <PressButton
              text={
                'Add book' +
                (!!data && !!data.book.onselffeed.length ? ' again' : '')
              }
              onPress={() =>
                navigation.navigate('addFeedBook', { bookId: data.book.bookId })
              }
              color={Styles.theme.current.main}
              loading={loading}
              containerStyle={{ marginTop: Styles.standardMargin / 2 }}
            />
            <WishButton
              bookId={!!data && data.book.bookId}
              isWished={!!data && data.book.isWished}
              loading={loading}
            />
          </>
        )}
      </View>
      {data && (
        <>
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
            {!!data.book.categories && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Styles.standardMargin,
                }}
              >
                {data.book.categories.map(category => (
                  <TouchableOpacity
                    key={category.name}
                    style={{
                      backgroundColor: Styles.theme.current.main,
                      borderRadius: 15,
                      padding: 3,
                      marginRight: Styles.standardMargin,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('category', { name: category.name })
                    }
                  >
                    <Typography>{category.icon}</Typography>
                    <Typography>{category.name}</Typography>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
        </>
      )}
    </ScrollView>
  )
}
