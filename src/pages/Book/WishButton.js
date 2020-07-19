import React, { useState } from 'react'
import PressButton from '../../components/PressButton'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../../util/useApolloError'
import UserPageQuery from '../../queries/UserPageQuery'
import BookPageQuery from '../../queries/BookPageQuery'
import Typography from '../../components/Typography'
import useStyles from '../../util/useStyles'

const AddBookToWishList = gql`
  mutation AddBookToWishList($bookId: String!) {
    addWishBook(bookId: $bookId)
  }
`

const RemoveBookFromWishList = gql`
  mutation RemoveBookFromWishList($bookId: String!) {
    removeWishBook(bookId: $bookId)
  }
`

export default ({ bookId, isWished: initialIsOnWishList }) => {
  const [isOnWishList, setIsOnWishList] = useState(initialIsOnWishList)

  return isOnWishList ? (
    <RemoveButton
      bookId={bookId}
      onCompleted={() => setIsOnWishList(!isOnWishList)}
    />
  ) : (
    <AddButton
      bookId={bookId}
      onCompleted={() => setIsOnWishList(!isOnWishList)}
    />
  )
}

const AddButton = ({ bookId, onCompleted }) => {
  const [callMutation, { loading, error }] = useMutation(AddBookToWishList, {
    variables: { bookId },
    onCompleted,
    refetchQueries: [
      { query: UserPageQuery },
      { query: BookPageQuery, variables: { bookId } },
    ],
  })
  const errorMessage = useApolloError(error)
  const { theme } = useStyles()

  return (
    <>
      <PressButton
        text='Add to wishlist'
        loading={loading}
        onPress={callMutation}
      />
      <Typography style={{ color: theme.current.error }}>
        {errorMessage}
      </Typography>
    </>
  )
}

const RemoveButton = ({ bookId, onCompleted }) => {
  const [callMutation, { loading, error }] = useMutation(
    RemoveBookFromWishList,
    {
      variables: { bookId },
      onCompleted,
      refetchQueries: [
        { query: UserPageQuery },
        { query: BookPageQuery, variables: { bookId } },
      ],
    }
  )
  const errorMessage = useApolloError(error)
  const { theme } = useStyles()

  return (
    <>
      <PressButton
        text='Remove from wishlist'
        loading={loading}
        onPress={callMutation}
      />
      <Typography style={{ color: theme.current.error }}>
        {errorMessage}
      </Typography>
    </>
  )
}
