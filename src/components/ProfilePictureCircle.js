import React from 'react'
import { View, Image } from 'react-native'
import Typography from './Typography'
import useStyles from '../util/useStyles'

export default ({ profilePicturePath, name, size, style }) => {
  const { theme } = useStyles()
  const initials = name
    .split(' ')
    .map(namePart => namePart.charAt(0))
    .join('')

  if (profilePicturePath)
    return (
      <Image
        source={{ uri: profilePicturePath }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'grey',
          ...style,
        }}
      />
    )
  else
    return (
      <View
        style={{
          backgroundColor: 'grey',
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography style={{ color: theme.dark.text, fontSize: size * 0.4 }}>
          {initials}
        </Typography>
      </View>
    )
}
