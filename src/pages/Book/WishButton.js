import React, { useState } from 'react'
import PressButton from '../../components/PressButton'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Text } from 'react-native'
import useApolloError from '../../util/useApolloError'
import UserPageQuery from '../../data/graphql/UserPageQuery'
import BookPageQuery from '../../data/graphql/BookPageQuery'

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

  return (
    <>
      <PressButton
        text='Add to wishlist'
        loading={loading}
        onPress={callMutation}
      />
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
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

  return (
    <>
      <PressButton
        text='Remove from wishlist'
        loading={loading}
        onPress={callMutation}
      />
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
    </>
  )
}
