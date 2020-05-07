import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default props => {
  return (
    <TextInput
      {...props}
      multiline={props.canHaveManyLines ? true : false}
      style={{ ...styles.textfield, ...props.style }}
    />
  )
}

const styles = StyleSheet.create({
  textfield: {
    backgroundColor: '#ddd',
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 6,
    width: '100%',
    padding: 3,
    marginBottom: 6,
    marginTop: 6,
  },
})
