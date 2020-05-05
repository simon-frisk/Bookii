import React from 'react'
import { View } from 'react-native'

export default ({ children }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 50,
    }}
  >
    {children}
  </View>
)
