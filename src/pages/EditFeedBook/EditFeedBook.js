import React from 'react'
import { ScrollView, View, ActivityIndicator, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styles from '../../util/Styles'
import ApolloError from '../../components/ApolloError'
import DeleteButton from './DeleteButton'
import Edit from './Edit'
import Styles from '../../util/Styles'

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
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (data) {
    const feedBook = data.user.feedBooks[0]
    if (!feedBook) return <View />
    return (
      <ScrollView style={styles.pageContainer}>
        <Text style={Styles.h1}>{feedBook.book.title}</Text>
        <Edit
          _id={feedBook._id}
          comment={feedBook.comment}
          date={feedBook.date}
          onCompleted={navigation.goBack}
        />
        <DeleteButton
          _id={feedBook._id}
          bookId={feedBook.bookId}
          onCompleted={navigation.goBack}
        />
      </ScrollView>
    )
  }
}
