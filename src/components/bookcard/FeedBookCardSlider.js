import React from 'react'
import { FlatList } from 'react-native'
import Styles from '../../util/Styles'
import FeedBookCard from './FeedBookCard'

export default ({ feedBooks, isSelf }) => (
  <FlatList
    data={feedBooks}
    keyExtractor={({ _id }, index) => index + _id}
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
        style={{ marginLeft: Styles.standardPageInset }}
      />
    )}
  />
)
