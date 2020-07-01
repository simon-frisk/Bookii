import React from 'react'
import { Image, View } from 'react-native'
import Typography from './Typography'

export default ({ uri, width, style, title }) => {
  return (
    <View style={style}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width,
            height: width * 1.5,
            resizeMode: 'contain',
          }}
        />
      ) : (
        <View
          style={{
            width,
            height: width * 1.5,
            backgroundColor: 'grey',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Typography>{title}</Typography>
        </View>
      )}
    </View>
  )
}
