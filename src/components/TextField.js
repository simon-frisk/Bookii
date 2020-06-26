import React from 'react'
import { View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default props => {
  return (
    <View
      style={[
        {
          backgroundColor: '#e2e2e2',
          borderColor: '#e2e2e2',
          borderRadius: 12,
          borderWidth: 6,
          paddingHorizontal: 3,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        },
        props.style,
      ]}
    >
      {props.icon && (
        <AntDesign
          name={props.icon}
          style={{ marginRight: 5 }}
          size={17}
          color='grey'
        />
      )}
      <TextInput
        {...props}
        multiline={props.canHaveManyLines ? true : false}
        style={{
          flex: 1,
          paddingVertical: 3,
        }}
      />
    </View>
  )
}
