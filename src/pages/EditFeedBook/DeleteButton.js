import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import PressButton from '../../components/PressButton'
import UserPageQuery from '../../queries/UserPageQuery'
import BookPageQuery from '../../queries/BookPageQuery'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import useStyles from '../../util/useStyles'

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
  const { theme } = useStyles()

  if (error)
    return (
      <Typography style={{ color: theme.current.error }}>
        {errorMessage}
      </Typography>
    )

  return (
    <PressButton
      onPress={callRemoveQuery}
      text='Remove from feed'
      loading={loading || !!data}
    />
  )
}
