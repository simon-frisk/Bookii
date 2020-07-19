import React from 'react'
import { TouchableOpacity, View, ActivityIndicator } from 'react-native'
import Typography from './Typography'
import useStyles from '../util/useStyles'

export default ({
  text,
  loading,
  onPress,
  color,
  containerStyle,
  disabled,
}) => {
  const styles = useStyles()

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 15,
          marginTop: styles.standardMargin / 2,
          backgroundColor: color || styles.theme.current.button,
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
            color: disabled ? '#999' : styles.theme.light.text,
          }}
        >
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  )
}
