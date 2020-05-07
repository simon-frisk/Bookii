import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, ScrollView } from 'react-native'
import TextField from '../components/TextField'
import DatePicker from '../components/DatePicker'
import Typography from '../components/Typography'
import ApolloError from '../components/ApolloError'
import { UserPage } from './User/User'
import { BookPage } from './Book/Book'
import Styles from '../util/Styles'

const AddFeedBook = gql`
  mutation AddFeedBook($bookId: String!, $comment: String!, $date: String!) {
    addFeedBook(bookId: $bookId, comment: $comment, date: $date) {
      _id
    }
  }
`

export default ({ route, navigation }) => {
  const bookId = route.params.bookId

  const [callAddReadBookMutation, { loading, error }] = useMutation(
    AddFeedBook,
    {
      refetchQueries: [
        { query: UserPage },
        {
          query: BookPage,
          variables: {
            bookId,
          },
        },
      ],
      onCompleted: navigation.goBack,
    }
  )

  const [date, setDate] = useState(new Date())
  const [comment, setComment] = useState('')

  const addBook = () => {
    callAddReadBookMutation({
      variables: { bookId, comment, date },
    })
  }

  return (
    <ScrollView contentContainerStyle={Styles.pageContainer}>
      <Typography size='h1'>Add book to feed</Typography>
      <DatePicker value={date} onChange={setDate} />
      <TextField
        placeholder='Say something about this book'
        value={comment}
        onChangeText={setComment}
      />
      {error && <ApolloError type='errortext' error={error} />}
      <Button title='Add Book' disabled={loading} onPress={addBook} />
    </ScrollView>
  )
}
