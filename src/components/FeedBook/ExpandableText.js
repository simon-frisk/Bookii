import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Typography from '../Typography'
import useTheme from '../../util/useTheme'

export default ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useTheme()

  if (text.length < 100) return <Typography>{text}</Typography>

  const extract = text
    .slice(0, 70)
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .concat(' ...')

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <Typography>{isExpanded ? text : extract}</Typography>
      <Typography style={{ color: theme.current.main }}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Typography>
    </TouchableOpacity>
  )
}
