import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import Styles from '../util/Styles'

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

const styles = {
  base: {
    padding: 9,
    marginVertical: 10,
    borderRadius: 10,
    ...Styles.shadow,
  },
  filled: {
    backgroundColor: '#47f',
  },
  baseText: {
    textAlign: 'center',
    fontSize: 16,
  },
  filledText: {
    color: 'white',
  },
}
