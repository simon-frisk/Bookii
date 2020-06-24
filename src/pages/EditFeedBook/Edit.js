import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { View } from 'react-native'
import TextField from '../../components/TextField'
import DatePicker from '../../components/DatePicker'
import PressButton from '../../components/PressButton'
import useApolloError from '../../util/useApolloError'

const UpdateFeedBook = gql`
  mutation UpdateFeedBook($_id: ID!, $comment: String, $date: String) {
    updateFeedBook(_id: $_id, comment: $comment, date: $date) {
      _id
      bookId
      comment
      date
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
  onCompleted,
}) => {
  const [callMutation, { loading, error }] = useMutation(UpdateFeedBook, {
    onCompleted,
  })
  const errorMessage = useApolloError(error)
  const [comment, setComment] = useState('')
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setComment(initialComment)
    setDate(initialDate)
  }, [])

  const submit = () => {
    callMutation({
      variables: {
        _id,
        comment,
        date,
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
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <PressButton
        onPress={submit}
        text='Update'
        type='filled'
        loading={loading}
      />
    </View>
  )
}
