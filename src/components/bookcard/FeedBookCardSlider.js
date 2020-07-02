import React from 'react'
import { FlatList } from 'react-native'
import useStyles from '../../util/useStyles'
import FeedBookCard from '../FeedBookCard'
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
          paddingBottom: 10,
        }}
        horizontal={true}
        renderItem={({ item: feedBook }) => (
          <FeedBookCard
            isSelf={isSelf}
            limitWidth={true}
            feedBook={feedBook}
            book={feedBook.book}
            style={{ marginHorizontal: Styles.standardPageInset / 2 }}
          />
        )}
      />
    </>
  )
}
