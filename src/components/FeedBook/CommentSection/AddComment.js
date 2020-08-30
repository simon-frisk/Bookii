import React, { useState } from 'react'
import TextField from '../../TextField'
import useTheme from '../../../util/useTheme'
import PressButton from '../../PressButton'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../../util/useApolloError'

const mutation = gql`
  mutation addFeedBookComment(
    $comment: String!
    $userId: ID!
    $feedBookId: ID!
  ) {
    addFeedBookComment(
      comment: $comment
      userId: $userId
      feedBookId: $feedBookId
    ) {
      _id
      comments {
        _id
        comment
        user {
          name
          profilePicturePath
          _id
        }
      }
    }
  }
`

export default ({ userId, feedBookId }) => {
  const theme = useTheme()
  const [callMutation, { loading, error, data }] = useMutation(mutation)
  const errorMessage = useApolloError(error)

  const [comment, setComment] = useState('')

  return (
    <View>
      <TextField
        placeholder='Comment'
        color={theme.current.background}
        value={comment}
        onChangeText={setComment}
      />
      {!!comment && (
        <PressButton
          text='Post comment'
          onPress={() =>
            callMutation({ variables: { userId, feedBookId, comment } })
          }
          loading={loading}
        />
      )}
    </View>
  )
}
