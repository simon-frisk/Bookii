import React from 'react'
import { Button } from 'react-native'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import ApolloError from '../../components/ApolloError'
import { UserPage } from '../User/User'
import { BookPage } from '../Book/Book'

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

  if (error) return <ApolloError type='errortext' error={error} />

  return (
    <Button
      onPress={callRemoveQuery}
      title='Remove'
      disabled={loading || !!data}
    />
  )
}
