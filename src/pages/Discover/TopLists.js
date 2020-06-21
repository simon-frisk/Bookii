import React, { useState, useEffect } from 'react'
import { SectionList, ActivityIndicator, View } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Typography from '../../components/Typography'
import Styles from '../../util/Styles'
import Center from '../../components/Center'
import ApolloError from '../../components/ApolloError'
import BookCard from '../../components/BookCard'

const TopList = gql`
  query TopList {
    nytimesBestSellers {
      name
      books {
        bookId
        title
        subTitle
        authors
        thumbnail
      }
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(TopList)

  const sections = data
    ? data.nytimesBestSellers.map(list => ({
        name: list.name,
        data: list.books,
      }))
    : []

  return (
    <SectionList
      contentContainerStyle={Styles.pageContainer}
      ListEmptyComponent={() => {
        if (error) return <ApolloError type='errorcomponent' error={error} />
        if (loading)
          return (
            <Center>
              <ActivityIndicator />
            </Center>
          )
        return <View />
      }}
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <Typography size='h2' style={{ marginVertical: 20 }}>
          {section.name}
        </Typography>
      )}
      renderItem={({ item: book }) => {
        return (
          <BookCard
            bookId={book.bookId}
            thumbnail={book.thumbnail}
            title={book.title}
            authors={book.authors}
          />
        )
      }}
      keyExtractor={(item, index) => item.bookId + index}
    />
  )
}
