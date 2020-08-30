import React from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import useTheme from '../../../util/useTheme'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const mutation = gql`
  mutation removeFeedBookComment($_id: ID!, $userId: ID!, $feedBookId: ID!) {
    removeFeedBookComment(_id: $_id, userId: $userId, feedBookId: $feedBookId) {
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

export default ({ _id, userId, feedBookId }) => {
  const theme = useTheme()
  const [callMutation] = useMutation(mutation, {
    variables: { _id, userId, feedBookId },
  })

  const showAlert = () => {
    Alert.alert('Remove comment', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove comment',
        style: 'destructive',
        onPress: callMutation,
      },
    ])
  }

  return (
    <TouchableOpacity onPress={showAlert}>
      <Entypo name='cross' size={24} color={theme.current.error} />
    </TouchableOpacity>
  )
}
