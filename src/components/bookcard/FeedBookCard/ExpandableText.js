import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (text.length < 130)
    return <Text style={{ marginVertical: 10 }}>{text}</Text>

  const extract = text
    .slice(0, 90)
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .concat(' ...')

  return (
    <>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={{ marginVertical: 10 }}>
          {isExpanded ? text : extract}
        </Text>
        <Text style={{ color: 'blue' }}>
          {isExpanded ? 'Read less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </>
  )
}
