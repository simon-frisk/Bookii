import React from 'react'
import { Image, View } from 'react-native'

export default ({ uri, width, style }) => {
  return (
    <View style={style}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width, height: width * 1.5, resizeMode: 'contain' }}
        />
      ) : (
        <View style={{ width, height: width * 1.5, backgroundColor: 'grey' }} />
      )}
    </View>
  )
}
