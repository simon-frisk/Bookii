import React from 'react'
import { Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/BookCover'
import Typography from '../../components/Typography'

export default ({
  thumbnail,
  title,
  bookId,
  subTitle,
  authors,
  pages,
  published,
  publisher,
  alreadyRead,
}) => {
  const navigation = useNavigation()

  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <BookCover uri={thumbnail} width={200} />
        <Typography size='h2' style={{ marginTop: 15, textAlign: 'center' }}>
          {title}
        </Typography>
        {subTitle && (
          <Typography grey style={{ marginBottom: 20, textAlign: 'center' }}>
            {subTitle}
          </Typography>
        )}
        <Button
          title={'Add book' + (alreadyRead ? ' again' : '')}
          onPress={() => navigation.navigate('addFeedBook', { bookId })}
          style={{ backgroundColor: 'blue' }}
        />
      </View>
      {authors && (
        <Typography grey>{`Author${
          authors.length > 1 ? 's' : ''
        }: ${authors.join(' , ')}`}</Typography>
      )}
      {pages && <Typography grey>Pages: {pages}</Typography>}
      {published && <Typography grey>Published: {published}</Typography>}
      {publisher && <Typography grey>Publisher: {publisher}</Typography>}
    </View>
  )
}
