import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import PressButton from '../../components/PressButton'
import UserPage from '../User/UserQuery'
import { BookPage } from '../Book/Book'
import { Text } from 'react-native'
import useApolloError from '../../util/useApolloError'

const RemoveFeedBook = gql`
  mutation RemoveFeedBook($_id: ID!) {
    removeFeedBook(_id: $_id) {
      _id
    }
  }
`

export default ({ _id, bookId, onCompleted }) => {
  const [callRemoveQuery, { data, loading, error }] = useMutation(
    RemoveFeedBook,
    {
      variables: { _id },
      refetchQueries: [
        { query: UserPage },
        {
          query: BookPage,
          variables: {
            bookId,
          },
        },
      ],
      onCompleted,
    }
  )
  const errorMessage = useApolloError(error)

  if (error) return <Text style={{ color: 'red' }}>{errorMessage}</Text>

  return (
    <PressButton
      onPress={callRemoveQuery}
      text='Remove from feed'
      loading={loading || !!data}
    />
  )
}
