import React from 'react'
import { View } from 'react-native'

export default ({ children, style }) => (
  <View
    style={{
      padding: 15,
      marginVertical: 7,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      backgroundColor: 'white',
      ...style,
    }}
  >
    {children}
  </View>
)
