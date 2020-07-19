import React from 'react'
import { FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import BookCard from './BookCard'
import Typography from '../Typography'

export default ({ books, title }) => {
  const Styles = useStyles()

  return (
    <>
      <Typography
        type='h2'
        style={{
          marginHorizontal: Styles.standardMargin,
          marginTop: Styles.doubleMargin,
        }}
      >
        {title}
      </Typography>
      <FlatList
        data={books}
        keyExtractor={({ bookId }, index) => index + bookId}
        contentContainerStyle={{
          paddingHorizontal: Styles.standardMargin / 2,
        }}
        horizontal={true}
        renderItem={({ item: book }) => (
          <BookCard
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            style={{
              marginHorizontal: Styles.standardMargin / 2,
              marginVertical: Styles.standardMargin,
            }}
          />
        )}
      />
    </>
  )
}
