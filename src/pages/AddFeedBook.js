import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ScrollView, Text } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import TextField from '../components/TextField'
import DatePicker from '../components/DatePicker'
import useApolloError from '../util/useApolloError'
import UserPage from './User/UserQuery'
import { BookPage } from './Book/Book'
import Styles from '../util/Styles'
import PressButton from '../components/PressButton'
import FavoriteToggle from '../components/FavoriteToggle'

const AddFeedBook = gql`
  mutation AddFeedBook(
    $bookId: String!
    $comment: String!
    $date: String!
    $favorite: Boolean!
  ) {
    addFeedBook(
      bookId: $bookId
      comment: $comment
      date: $date
      favorite: $favorite
    ) {
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
      onCompleted: () => {
        Segment.track('FeedBook added')
        navigation.goBack()
      },
    }
  )
  const errorMessage = useApolloError(error)

  const [date, setDate] = useState(new Date())
  const [comment, setComment] = useState('')
  const [favorite, setFavorite] = useState(false)

  const addBook = () => {
    callAddReadBookMutation({
      variables: { bookId, comment, date, favorite },
    })
  }

  return (
    <ScrollView contentContainerStyle={{ padding: Styles.standardPageInset }}>
      <Text style={Styles.h1}>Add book to feed</Text>
      <DatePicker value={date} onChange={setDate} />
      <TextField
        placeholder='Say something about this book'
        canHaveManyLines={true}
        value={comment}
        onChangeText={setComment}
      />
      <FavoriteToggle favorite={favorite} setFavorite={setFavorite} />
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <PressButton
        text='Add Book'
        loading={loading}
        type='filled'
        onPress={addBook}
      />
    </ScrollView>
  )
}
