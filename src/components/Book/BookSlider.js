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
          marginHorizontal: Styles.standardPageInset,
          marginTop: 25,
        }}
      >
        {title}
      </Typography>
      <FlatList
        data={books}
        keyExtractor={({ bookId }, index) => index + bookId}
        contentContainerStyle={{
          paddingHorizontal: Styles.standardPageInset / 2,
          paddingBottom: 5,
        }}
        horizontal={true}
        renderItem={({ item: book }) => (
          <BookCard
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            title={book.title}
            style={{
              marginHorizontal: Styles.standardPageInset / 2,
              marginVertical: 10,
            }}
          />
        )}
      />
    </>
  )
}
