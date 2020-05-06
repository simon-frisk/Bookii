import React from 'react'
import { View, Image } from 'react-native'

export default ({ profilePicturePath, size, style }) => {
  if (profilePicturePath)
    return (
      <Image
        source={{ uri: profilePicturePath }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style,
        }}
      />
    )
  else
    return (
      <View
        style={{
          backgroundColor: 'darkgrey',
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style,
        }}
      />
    )
}
