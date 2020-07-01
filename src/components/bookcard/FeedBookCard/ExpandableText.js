import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Typography from '../../Typography'
import useTheme from '../../../util/useTheme'

export default ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useTheme()

  if (text.length < 130)
    return <Typography style={{ marginVertical: 10 }}>{text}</Typography>

  const extract = text
    .slice(0, 90)
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .concat(' ...')

  return (
    <>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Typography style={{ marginVertical: 10 }}>
          {isExpanded ? text : extract}
        </Typography>
        <Typography style={{ color: theme.current.main }}>
          {isExpanded ? 'Read less' : 'Read more'}
        </Typography>
      </TouchableOpacity>
    </>
  )
}
