import React from 'react'
import { View, Image, Text } from 'react-native'

export default ({ profilePicturePath, name, size, style }) => {
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
        <Text style={{ color: 'white', fontSize: size * 0.4 }}>{initials}</Text>
      </View>
    )
}
