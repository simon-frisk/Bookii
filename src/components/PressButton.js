import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

export default ({ text, type, loading, onPress, containerStyle }) => {
  let style = styles.base
  switch (type) {
    case 'outline':
      style = { ...style, ...styles.outline }
      break
    case 'filled':
      style = { ...style, ...styles.filled }
      break
  }
  let textStyle = styles.baseText
  switch (type) {
    case 'outline':
      textStyle = { ...textStyle, ...styles.outlineText }
      break
    case 'filled':
      textStyle = { ...textStyle, ...styles.filledText }
      break
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...style, ...containerStyle }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={textStyle}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  outline: {
    borderColor: '#47f',
    borderWidth: 1,
  },
  filled: {
    backgroundColor: '#47f',
  },
  baseText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  outlineText: {
    color: '#47f',
  },
  filledText: {
    color: 'white',
  },
})
