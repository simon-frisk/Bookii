import React from 'react'
import { TouchableOpacity, View, ActivityIndicator } from 'react-native'
import Typography from './Typography'
import useTheme from '../util/useTheme'

export default ({
  text,
  loading,
  onPress,
  color,
  containerStyle,
  disabled,
}) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <View
        style={[
          {
            padding: 10,
            borderRadius: 15,
            marginVertical: 8,
            backgroundColor: color || theme.current.button,
          },
          containerStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Typography
            style={{
              textAlign: 'center',
              color: disabled ? '#999' : theme.light.text,
            }}
          >
            {text}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  )
}

function isColorLight(color) {
  var r, g, b, hsp
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )
    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  if (hsp > 127.5) {
    return 'light'
  } else {
    return 'dark'
  }
}
