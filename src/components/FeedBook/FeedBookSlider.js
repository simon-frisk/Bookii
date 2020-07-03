import React from 'react'
import { FlatList } from 'react-native'
import Typography from '../Typography'
import useStyles from '../../util/useStyles'
import FeedBookCard from './FeedBookCard'

export default ({ title, feedBooks, isSelf }) => {
  const styles = useStyles()

  return (
    <>
      <Typography
        type='h2'
        style={{ marginHorizontal: styles.standardPageInset, marginTop: 25 }}
      >
        {title}
      </Typography>
      <FlatList
        data={feedBooks}
        keyExtractor={({ _id }, index) => index + _id}
        contentContainerStyle={{
          paddingHorizontal: styles.standardPageInset / 2,
          paddingBottom: 10,
        }}
        horizontal={true}
        renderItem={({ item }) => (
          <FeedBookCard
            limitWidth={true}
            feedBook={item}
            isSelf={isSelf}
            style={{ marginHorizontal: styles.standardPageInset }}
          />
        )}
      />
    </>
  )
}
