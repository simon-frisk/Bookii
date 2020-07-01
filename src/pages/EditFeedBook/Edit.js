import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import DatePicker from '../../components/DatePicker'
import PressButton from '../../components/PressButton'
import FavoriteToggle from '../../components/FavoriteToggle'
import useApolloError from '../../util/useApolloError'
import useTheme from '../../util/useTheme'
import Typography from '../../components/Typography'

const UpdateFeedBook = gql`
  mutation UpdateFeedBook(
    $_id: ID!
    $comment: String
    $date: String
    $favorite: Boolean
  ) {
    updateFeedBook(
      _id: $_id
      comment: $comment
      date: $date
      favorite: $favorite
    ) {
      _id
      bookId
      comment
      date
      favorite
      book {
        thumbnail
        title
        bookId
      }
    }
  }
`

export default ({
  _id,
  comment: initialComment,
  date: initialDate,
  favorite: initialFavorite,
  onCompleted,
}) => {
  const [callMutation, { loading, error }] = useMutation(UpdateFeedBook, {
    onCompleted,
  })
  const theme = useTheme()
  const errorMessage = useApolloError(error)
  const [comment, setComment] = useState(initialComment)
  const [date, setDate] = useState(initialDate)
  const [favorite, setFavorite] = useState(initialFavorite)

  const submit = () => {
    callMutation({
      variables: {
        _id,
        comment,
        date,
        favorite,
      },
    })
  }

  return (
    <View>
      <DatePicker value={date} onChange={setDate} />
      <TextField
        value={comment}
        canHaveManyLines={true}
        onChangeText={setComment}
        placeholder='Say something about this book'
      />
      <FavoriteToggle favorite={favorite} setFavorite={setFavorite} />
      {error && (
        <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
      )}
      <PressButton
        onPress={submit}
        text='Update'
        color={theme.main}
        loading={loading}
      />
    </View>
  )
}
