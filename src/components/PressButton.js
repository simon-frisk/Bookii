import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import Styles from '../util/Styles'

export default ({ text, type, loading, onPress, containerStyle }) => {
  let style = styles.base
  if (type === 'filled') style = { ...style, ...styles.filled }
  if (type === 'error') style = { ...style, ...styles.error }

  let textStyle = styles.baseText
  if (type === 'filled' || type === 'error')
    textStyle = { ...textStyle, ...styles.filledText }

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

const styles = {
  base: {
    padding: 9,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    backgroundColor: 'white',
  },
  filled: {
    backgroundColor: '#47f',
  },
  error: {
    backgroundColor: '#d22',
  },
  baseText: {
    textAlign: 'center',
    fontSize: 16,
  },
  filledText: {
    color: 'white',
  },
}
