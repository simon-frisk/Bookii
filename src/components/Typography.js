import React from 'react'
import { Text } from 'react-native'

export default ({ size, grey, style, children }) => {
  let fontSize
  switch (size) {
    case 'h1':
      fontSize = 39
      break
    case 'h2':
      fontSize = 32
      break
    case 'h3':
      fontSize = 24
      break
    case 'h4':
      fontSize = 16
  }

  return (
    <Text
      style={{
        fontSize,
        color: grey ? 'grey' : 'black',
        ...style,
      }}
    >
      {children}
    </Text>
  )
}
