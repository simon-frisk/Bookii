import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default props => {
  return (
    <TextInput
      {...props}
      style={styles.textfield}
      keyboardAppearance='dark'
      clearButtonMode='always'
    />
  )
}

const styles = StyleSheet.create({
  textfield: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 6,
    marginTop: 6,
  },
})
