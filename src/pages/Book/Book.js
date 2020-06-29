import React from 'react'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import Styles from '../../util/Styles'
import FeedBookCardSlider from '../../components/bookcard/FeedBookCardSlider'
import WishButton from './WishButton'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/BookCover'
import PressButton from '../../components/PressButton'
import useBookPage from '../../data/hooks/useBookPage'

export default ({ route }) => {
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
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      </View>
    )

  if (data)
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: Styles.standardPageInset }}
      >
        <View style={{ padding: Styles.standardPageInset }}>
          <View style={{ marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <BookCover uri={data.book.thumbnail} width={200} />
              <Text
                style={{ marginTop: 15, textAlign: 'center', ...Styles.h2 }}
              >
                {data.book.title}
              </Text>
              {data.book.subTitle && (
                <Text style={{ textAlign: 'center', color: 'grey' }}>
                  {data.book.subTitle}
                </Text>
              )}
            </View>
            <PressButton
              text={
                'Add book' + (!!data.book.onselffeed.length ? ' again' : '')
              }
              onPress={() =>
                navigation.navigate('addFeedBook', { bookId: data.book.bookId })
              }
              type='filled'
            />
            <WishButton
              bookId={data.book.bookId}
              isWished={data.book.isWished}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            {data.book.authors && (
              <Text style={{ color: 'grey' }}>{`Author${
                data.book.authors.length > 1 ? 's' : ''
              }: ${data.book.authors.join(' , ')}`}</Text>
            )}
            {data.book.pages && (
              <Text style={{ color: 'grey' }}>Pages: {data.book.pages}</Text>
            )}
            {data.book.published && (
              <Text style={{ color: 'grey' }}>
                Published: {data.book.published}
              </Text>
            )}
            {data.book.publisher && (
              <Text style={{ color: 'grey' }}>
                Publisher: {data.book.publisher}
              </Text>
            )}
          </View>
          {data.book.wikipediadescription && (
            <View style={[Styles.card, { padding: 20 }]}>
              <Text style={Styles.h3}>Wikipedia</Text>
              <Text>{data.book.wikipediadescription}</Text>
            </View>
          )}
        </View>
        {!!data.book.onselffeed.length && (
          <FeedBookCardSlider
            feedBooks={data.book.onselffeed}
            isSelf={true}
            title='On your feed'
          />
        )}
        {!!data.book.onfollowingfeed.length && (
          <FeedBookCardSlider
            feedBooks={data.book.onfollowingfeed}
            isSelf={false}
            title='On following feeds'
          />
        )}
      </ScrollView>
    )
}
