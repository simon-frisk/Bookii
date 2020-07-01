import React, { useEffect, useState } from 'react'
import PressButton from '../../components/PressButton'
import useInappropriateFlag from '../../data/hooks/useInappropriateFlag'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

export default ({ _id, isFlagged: isFlaggedInitial }) => {
  const { callMutation, errorMessage, loading, data } = useInappropriateFlag({
    _id,
  })
  const [isFlagged, setIsFlagged] = useState(isFlaggedInitial)
  const theme = useTheme()

  useEffect(() => {
    if (data) setIsFlagged(data.toggleinappropriateflagged)
  }, [data])

  return (
    <>
      {isFlagged && (
        <Typography>
          You have flagged this user for inappropriate content. User will be
          reviewed and neccesary actions will be taken.
        </Typography>
      )}
      {errorMessage && (
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
      )}
      <PressButton
        text={isFlagged ? 'Unflag' : 'Flag for inappropriate content'}
        onPress={callMutation}
        loading={loading}
        type='secondary'
      />
    </>
  )
}
