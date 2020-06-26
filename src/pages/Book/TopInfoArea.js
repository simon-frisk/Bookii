import React from 'react'
import { View, Text } from 'react-native'
import PressButton from '../../components/PressButton'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/BookCover'
import Styles from '../../util/Styles'

export default ({
  thumbnail,
  title,
  bookId,
  subTitle,
  authors,
  pages,
  published,
  publisher,
  wikipediadescription,
  alreadyRead,
}) => {
  const navigation = useNavigation()

  return (
    <View style={{ padding: Styles.standardPageInset }}>
      <View style={{ marginBottom: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <BookCover uri={thumbnail} width={200} />
          <Text style={{ marginTop: 15, textAlign: 'center', ...Styles.h2 }}>
            {title}
          </Text>
          {subTitle && (
            <Text style={{ textAlign: 'center', color: 'grey' }}>
              {subTitle}
            </Text>
          )}
        </View>
        <PressButton
          text={'Add book' + (alreadyRead ? ' again' : '')}
          onPress={() => navigation.navigate('addFeedBook', { bookId })}
          type='filled'
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        {authors && (
          <Text style={{ color: 'grey' }}>{`Author${
            authors.length > 1 ? 's' : ''
          }: ${authors.join(' , ')}`}</Text>
        )}
        {pages && <Text style={{ color: 'grey' }}>Pages: {pages}</Text>}
        {published && (
          <Text style={{ color: 'grey' }}>Published: {published}</Text>
        )}
        {publisher && (
          <Text style={{ color: 'grey' }}>Publisher: {publisher}</Text>
        )}
      </View>
      {wikipediadescription && (
        <View style={[Styles.card, { padding: 10 }]}>
          <Text style={Styles.h3}>Wikipedia</Text>
          <Text>{wikipediadescription}</Text>
        </View>
      )}
    </View>
  )
}
