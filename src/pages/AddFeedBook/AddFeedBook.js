import React, { useState } from 'react'
import { Button, ScrollView } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TextField from '../../components/TextField'
import DatePicker from './DatePicker'
import Styles from '../../util/Styles'
import Typography from '../../components/Typography'
import { UserPage } from '../Me'
import { BookPage } from '../Book/Book'

const AddFeedBook = gql`
  mutation AddFeedBook($bookId: String!, $comment: String!, $date: String!) {
    addFeedBook(bookId: $bookId, comment: $comment, date: $date) {
      _id
    }
  }
`

export default ({ route, navigation }) => {
  const bookId = route.params.bookId

  const [date, setDate] = useState(new Date())
  const [comment, setComment] = useState('')

  const [callAddReadBookMutation, { data, loading, error }] = useMutation(
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
    }
  )

  const addBook = () => {
    callAddReadBookMutation({
      variables: { bookId, comment, date },
    })
  }

  return (
    <ScrollView contentContainerStyle={Styles.pageContainer}>
      <Typography size='h1'>Add book to feed</Typography>
      <TextField
        placeholder='Say something about this book'
        value={comment}
        onChangeText={setComment}
      />
      <DatePicker value={date} onChange={setDate} />
      <Button title='Add Book' onPress={addBook} />
    </ScrollView>
  )
}
