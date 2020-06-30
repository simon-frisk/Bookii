import React from 'react'
import { FlatList, Text } from 'react-native'
import Styles from '../../util/Styles'
import FeedBookCard from './FeedBookCard/FeedBookCard'

export default ({ feedBooks, isSelf, title }) => (
  <>
    <Text
      style={[
        Styles.h2,
        {
          marginHorizontal: Styles.standardPageInset,
          marginTop: 30,
        },
      ]}
    >
      {title}
    </Text>
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
