import React from 'react'
import { Button } from 'react-native'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import ApolloErrorText from '../../components/ApolloErrorText'
import { UserPage } from '../Me'
import { BookPage } from '../Book/Book'

const RemoveFeedBook = gql`
  mutation RemoveFeedBook($_id: ID!) {
    removeFeedBook(_id: $_id) {
      _id
    }
  }
`

export default ({ _id, bookId }) => {
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
    }
  )

  if (error) return <ApolloErrorText error={error} />

  return <Button onPress={callRemoveQuery} title='remove' disabled={loading} />
}
