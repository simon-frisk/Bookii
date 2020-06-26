import React from 'react'
import { SectionList, ActivityIndicator, View, Text } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Styles from '../../util/Styles'
import useApolloError from '../../util/useApolloError'
import BookCard from '../../components/bookcard/BookCard'

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
  const errorMessage = useApolloError(error)

  const sections = data
    ? data.nytimesBestSellers.map(list => ({
        name: list.name,
        data: list.books,
      }))
    : []

  return (
    <SectionList
      contentContainerStyle={{ padding: Styles.standardPageInset }}
      ListEmptyComponent={() => {
        if (error)
          return (
            <View style={Styles.center}>
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            </View>
          )
        if (loading)
          return (
            <View style={Styles.center}>
              <ActivityIndicator />
            </View>
          )
        return <View />
      }}
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <Text style={{ marginVertical: 20, ...Styles.h2 }}>{section.name}</Text>
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
