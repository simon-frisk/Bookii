import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import PressButton from '../../components/PressButton'
import UserPageQuery from '../../data/graphql/UserPageQuery'
import BookPageQuery from '../../data/graphql/BookPageQuery'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

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
        { query: UserPageQuery },
        {
          query: BookPageQuery,
          variables: {
            bookId,
          },
        },
      ],
      onCompleted,
    }
  )
  const errorMessage = useApolloError(error)
  const theme = useTheme()

  if (error)
    return (
      <Typography style={{ color: theme.error }}>{errorMessage}</Typography>
    )

  return (
    <PressButton
      onPress={callRemoveQuery}
      text='Remove from feed'
      loading={loading || !!data}
    />
  )
}
