import React from 'react'
import { FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import SmallBookCard from './SmallBookCard'
import Typography from '../Typography'

export default ({ books, title }) => {
  const Styles = useStyles()

  return (
    <>
      <Typography
        type='h2'
        style={{
          marginHorizontal: Styles.standardPageInset,
          marginTop: 30,
        }}
      >
        {title}
      </Typography>
      <FlatList
        data={books}
        keyExtractor={({ bookId }, index) => index + bookId}
        contentContainerStyle={{
          paddingHorizontal: Styles.standardPageInset / 2,
          paddingVertical: 15,
        }}
        horizontal={true}
        renderItem={({ item: book }) => (
          <SmallBookCard
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            title={book.title}
            style={{ marginHorizontal: Styles.standardPageInset / 2 }}
          />
        )}
      />
    </>
  )
}
