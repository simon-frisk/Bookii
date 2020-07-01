import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ScrollView } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import TextField from '../components/TextField'
import DatePicker from '../components/DatePicker'
import useApolloError from '../util/useApolloError'
import UserPageQuery from '../data/graphql/UserPageQuery'
import BookPageQuery from '../data/graphql/BookPageQuery'
import useStyles from '../util/useStyles'
import PressButton from '../components/PressButton'
import FavoriteToggle from '../components/FavoriteToggle'
import Typography from '../components/Typography'
import useTheme from '../util/useTheme'

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
  const theme = useTheme()

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
    <ScrollView contentContainerStyle={{ padding: Styles.standardPageInset }}>
      <Typography type='h1'>Add book to feed</Typography>
      <DatePicker value={date} onChange={setDate} />
      <TextField
        placeholder='Say something about this book'
        canHaveManyLines={true}
        value={comment}
        onChangeText={setComment}
      />
      <FavoriteToggle favorite={favorite} setFavorite={setFavorite} />
      {error && (
        <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
      )}
      <PressButton
        text='Add Book'
        loading={loading}
        color={theme.main}
        onPress={addBook}
      />
    </ScrollView>
  )
}
