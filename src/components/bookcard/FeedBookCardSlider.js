import React from 'react'
import { FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import FeedBookCard from './FeedBookCard/FeedBookCard'
import Typography from '../Typography'

export default ({ feedBooks, isSelf, title }) => {
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
        data={feedBooks}
        keyExtractor={({ _id }, index) => index + _id}
        contentContainerStyle={{
          paddingHorizontal: Styles.standardPageInset / 2,
          paddingVertical: 15,
        }}
        horizontal={true}
        renderItem={({ item: feedBook }) => (
          <FeedBookCard
            isSelf={isSelf}
            feedBookId={feedBook._id}
            bookId={feedBook.book.bookId}
            thumbnail={feedBook.book.thumbnail}
            title={feedBook.book.title}
            comment={feedBook.comment}
            date={feedBook.date}
            style={{ marginHorizontal: Styles.standardPageInset / 2 }}
          />
        )}
      />
    </>
  )
}
