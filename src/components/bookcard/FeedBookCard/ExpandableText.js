import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const extract = text.slice(0, 120).split(' ').slice(0, -1).join(' ')

  return (
    <>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={{ marginTop: 10 }}>{isExpanded ? text : extract}</Text>
        <Text style={{ color: 'blue' }}>
          {isExpanded ? 'Read less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </>
  )
}
