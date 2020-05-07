import React from 'react'
import { ScrollView } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styles from '../../util/Styles'
import Typography from '../../components/Typography'
import Center from '../../components/Center'
import { ActivityIndicator, View } from 'react-native'
import ApolloError from '../../components/ApolloError'
import DeleteButton from './DeleteButton'
import Edit from './Edit'

const UpdateFeedBookPage = gql`
  query UpdateFeedBookPage($_id: ID!) {
    user {
      _id
      feedBooks(_id: $_id) {
        _id
        bookId
        comment
        date
        book {
          title
        }
      }
    }
  }
`

export default ({ route, navigation }) => {
  const { data, loading, error } = useQuery(UpdateFeedBookPage, {
    variables: { _id: route.params._id },
  })

  if (error) return <ApolloError type='errorcomponent' error={error} />

  if (loading)
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )

  if (data) {
    const feedBook = data.user.feedBooks[0]
    if (!feedBook) return <View />
    return (
      <ScrollView style={styles.pageContainer}>
        <Typography size='h1'>{feedBook.book.title}</Typography>
        <Typography size='h3'>Edit</Typography>
        <Edit
          _id={feedBook._id}
          comment={feedBook.comment}
          date={feedBook.date}
          onCompleted={navigation.goBack}
        />
        <Typography size='h3'>Delete</Typography>
        <DeleteButton
          _id={feedBook._id}
          bookId={feedBook.bookId}
          onCompleted={navigation.goBack}
        />
      </ScrollView>
    )
  }
}
