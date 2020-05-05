import React from 'react'
import { Image, View } from 'react-native'

export default ({ uri, width, style }) => (
  <View
    style={{
      shadowColor: 'black',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      ...style,
    }}
  >
    {uri ? (
      <Image source={{ uri }} style={{ width, height: width * 1.6 }} />
    ) : (
      <View style={{ width, height: width * 1.5, background: 'grey' }} />
    )}
  </View>
)
