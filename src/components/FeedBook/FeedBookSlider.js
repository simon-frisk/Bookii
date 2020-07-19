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
        style={{
          marginHorizontal: styles.standardMargin,
          marginTop: styles.doubleMargin,
        }}
      >
        {title}
      </Typography>
      <FlatList
        data={feedBooks}
        keyExtractor={({ _id }, index) => index + _id}
        contentContainerStyle={{
          paddingHorizontal: styles.standardMargin / 2,
          paddingBottom: styles.standardMargin / 2,
        }}
        horizontal={true}
        renderItem={({ item }) => (
          <FeedBookCard
            limitWidth={true}
            feedBook={item}
            isSelf={isSelf}
            style={{ marginHorizontal: styles.standardMargin / 2 }}
          />
        )}
      />
    </>
  )
}
