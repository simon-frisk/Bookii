import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Typography from './Typography'
import useStyles from '../util/useStyles'

export default ({ text, style, extractLength }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useStyles()

  if (text.length < extractLength + 30)
    return <Typography style={style}>{text}</Typography>

  const extract = text
    .slice(0, extractLength)
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .concat(' ...')

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={style}>
      <Typography>{isExpanded ? text : extract}</Typography>
      <Typography style={{ color: theme.current.main }}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Typography>
    </TouchableOpacity>
  )
}
