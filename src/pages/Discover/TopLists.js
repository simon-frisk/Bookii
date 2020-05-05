import React, { useState, useEffect } from 'react'
import { SectionList, ActivityIndicator, View } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Typography from '../../components/Typography'
import Styles from '../../util/Styles'
import Center from '../../components/Center'
import ApolloErrorText from '../../components/ApolloErrorText'
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
  const [lists, setLists] = useState([])

  useEffect(() => {
    if (data)
      setLists(
        data.nytimesBestSellers.map(list => ({
          name: list.name,
          data: list.books,
        }))
      )
  }, [data])
  console.log(lists)

  return (
    <SectionList
      ListHeaderComponent={() => <Typography size='h1'>Toplists</Typography>}
      contentContainerStyle={Styles.pageContainer}
      ListEmptyComponent={() => {
        if (error)
          return (
            <Center>
              <ApolloErrorText error={error} />
            </Center>
          )
        if (loading)
          return (
            <Center>
              <ActivityIndicator />
            </Center>
          )
        return <View />
      }}
      sections={lists}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: list }) => (
        <Typography size='h2' style={{ marginVertical: 20 }}>
          {list.name}
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
