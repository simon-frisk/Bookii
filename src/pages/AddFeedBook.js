import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ScrollView } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import TextField from '../components/TextField'
import DatePicker from '../components/DatePicker'
import useApolloError from '../util/useApolloError'
import UserPageQuery from '../queries/UserPageQuery'
import BookPageQuery from '../queries/BookPageQuery'
import PressButton from '../components/PressButton'
import FavoriteToggle from '../components/FavoriteToggle'
import Typography from '../components/Typography'
import useStyles from '../util/useStyles'

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
  const Styles = useStyles()

  const [callAddReadBookMutation, { loading, error }] = useMutation(
    AddFeedBook,
    {
      refetchQueries: [
        { query: UserPageQuery },
        {
          query: BookPageQuery,
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
    <ScrollView contentContainerStyle={{ padding: Styles.standardMargin }}>
      <Typography type='h1'>Add book</Typography>
      <DatePicker date={date} onDateChange={setDate} />
      <TextField
        placeholder='Say something about this book'
        canHaveManyLines={true}
        value={comment}
        onChangeText={setComment}
      />
      <FavoriteToggle favorite={favorite} setFavorite={setFavorite} />
      {error && (
        <Typography style={{ color: Styles.theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        text='Add Book'
        loading={loading}
        color={Styles.theme.current.main}
        onPress={addBook}
      />
    </ScrollView>
  )
}
