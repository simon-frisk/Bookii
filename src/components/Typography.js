import React from 'react'
import { Text } from 'react-native'

export default ({ size, grey, style, bold, children }) => {
  let fontSize
  switch (size) {
    case 'h1':
      fontSize = 40
      break
    case 'h2':
      fontSize = 32
      break
    case 'h3':
      fontSize = 26
      break
    case 'h4':
      fontSize = 16
  }

  return (
    <Text
      style={{
        fontSize,
        color: grey ? 'grey' : 'black',
        fontWeight: bold ? 'bold' : 'normal',
        ...style,
      }}
    >
      {children}
    </Text>
  )
}
