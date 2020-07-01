import React from 'react'
import { Text } from 'react-native'
import useTheme from '../util/useTheme'

const font = Platform.select({
  ios: { fontFamily: 'Arial Rounded MT Bold' },
})

export default props => {
  const Theme = useTheme()

  const fontSizeAndWeight = getFontSize(props.type)

  return (
    <Text
      {...props}
      style={[{ color: Theme.text }, fontSizeAndWeight, font, props.style]}
    >
      {props.children}
    </Text>
  )
}

function getFontSize(type) {
  if (type === 'h1') return { fontSize: 34, fontWeight: '600' }
  if (type === 'h2') return { fontSize: 28, fontWeight: '500' }
  if (type === 'h3') return { fontSize: 22, fontWeight: '500' }
  if (type === 'h4') return { fontSize: 20, fontWeight: '500' }
  else return { fontSize: 17 }
}
