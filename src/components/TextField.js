import React from 'react'
import { View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.icon && (
        <AntDesign
          name={props.icon}
          style={{ marginRight: 5 }}
          size={15}
          color='grey'
        />
      )}
      <TextInput
        {...props}
        multiline={props.canHaveManyLines ? true : false}
        style={styles.textfield}
      />
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: '#ddd',
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 6,
    paddingHorizontal: 3,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textfield: {
    flex: 1,
    paddingVertical: 3,
  },
}
