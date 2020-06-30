import React from 'react'
import { FlatList, Text } from 'react-native'
import Styles from '../../util/Styles'
import SmallBookCard from './SmallBookCard'

export default ({ books, title }) => (
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
