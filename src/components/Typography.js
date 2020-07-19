import React from 'react'
import { Text } from 'react-native'
import useStyles from '../util/useStyles'

export default props => {
  const { theme } = useStyles()

  const fontSizeAndWeight = getFontSize(props.type)

  return (
    <Text
      {...props}
      style={[
        { color: theme.current.text },
        fontSizeAndWeight,
        theme.font,
        props.style,
      ]}
    >
      {props.children}
    </Text>
  )
}

function getFontSize(type) {
  if (type === 'h1') return { fontSize: 40, fontWeight: '600' }
  if (type === 'h2') return { fontSize: 32, fontWeight: '500' }
  if (type === 'h3') return { fontSize: 25, fontWeight: '500' }
  if (type === 'h4') return { fontSize: 19, fontWeight: '500' }
  else return { fontSize: 17 }
}
