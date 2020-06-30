import React from 'react'
import { SectionList, ActivityIndicator, View, Text } from 'react-native'
import useTopListsPage from '../../data/hooks/useTopListsPage'
import Styles from '../../util/Styles'
import BookCard from '../../components/bookcard/BookCard'

export default () => {
  const { data, loading, errorMessage } = useTopListsPage()

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
        if (errorMessage)
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
