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
  if (type === 'filled') style = { ...style, ...styles.filled }

  let textStyle = styles.baseText
  if (type === 'filled') textStyle = { ...textStyle, ...styles.filledText }

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
    padding: 9,
    marginVertical: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  filled: {
    backgroundColor: '#47f',
  },
  baseText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#47f',
  },
  filledText: {
    color: 'white',
  },
})
