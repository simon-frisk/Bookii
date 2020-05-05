import React from 'react'
import { ScrollView } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styles from '../../util/Styles'
import Typography from '../../components/Typography'
import Center from '../../components/Center'
import { ActivityIndicator } from 'react-native'
import ApolloErrorText from '../../components/ApolloErrorText'
import DeleteButton from './DeleteButton'

const UpdateFeedBookPage = gql`
  query UpdateFeedBookPage($_id: ID!) {
    user {
      _id
      feedBooks(_id: $_id) {
        _id
        bookId
        book {
          title
        }
      }
    }
  }
`

export default ({ route }) => {
  const { data, loading, error } = useQuery(UpdateFeedBookPage, {
    variables: { _id: route.params._id },
  })

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

  if (data) {
    const feedBook = data.user.feedBooks[0]
    return (
      <ScrollView style={styles.pageContainer}>
        <Typography size='h1'>{feedBook.book.title}</Typography>
        <DeleteButton _id={feedBook._id} bookId={feedBook.bookId} />
      </ScrollView>
    )
  }
}
