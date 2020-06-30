import React, { useEffect, useState } from 'react'
import PressButton from '../../components/PressButton'
import useInappropriateFlag from '../../data/hooks/useInappropriateFlag'
import { Text } from 'react-native'

export default ({ _id, isFlagged: isFlaggedInitial }) => {
  const { callMutation, errorMessage, loading, data } = useInappropriateFlag({
    _id,
  })
  const [isFlagged, setIsFlagged] = useState(isFlaggedInitial)

  useEffect(() => {
    if (data) setIsFlagged(data.toggleinappropriateflagged)
  }, [data])

  return (
    <>
      {isFlagged && (
        <Text>
          You have flagged this user for inappropriate content. User will be
          reviewed and neccesary actions will be taken.
        </Text>
      )}
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <PressButton
        text={isFlagged ? 'Unflag' : 'Flag for inappropriate content'}
        onPress={callMutation}
        loading={loading}
      />
    </>
  )
}
