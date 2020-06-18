import React from 'react'
import { View } from 'react-native'
import PressButton from '../../components/PressButton'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../components/BookCover'
import Typography from '../../components/Typography'
import Card from '../../components/Card'

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
    <View>
      <View style={{ marginBottom: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <BookCover uri={thumbnail} width={200} />
          <Typography size='h2' style={{ marginTop: 15, textAlign: 'center' }}>
            {title}
          </Typography>
          {subTitle && (
            <Typography grey style={{ textAlign: 'center' }}>
              {subTitle}
            </Typography>
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
          <Typography grey>{`Author${
            authors.length > 1 ? 's' : ''
          }: ${authors.join(' , ')}`}</Typography>
        )}
        {pages && <Typography grey>Pages: {pages}</Typography>}
        {published && <Typography grey>Published: {published}</Typography>}
        {publisher && <Typography grey>Publisher: {publisher}</Typography>}
      </View>
      {wikipediadescription && (
        <Card>
          <Typography size='h3'>On wikipedia</Typography>
          <Typography>{wikipediadescription}</Typography>
        </Card>
      )}
    </View>
  )
}
