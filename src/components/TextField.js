import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import useStyles from '../util/useStyles'

export default props => {
  const styles = useStyles()

  return (
    <View
      style={[
        {
          backgroundColor: styles.theme.light.button,
          borderColor: styles.theme.light.button,
          borderRadius: 15,
          marginTop: styles.standardMargin / 2,
          flexDirection: 'row',
        },
        props.style,
      ]}
    >
      {props.icon && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
          }}
        >
          <FontAwesome
            name={props.icon}
            size={18}
            color={styles.theme.light.text}
          />
        </View>
      )}
      <TextInput
        {...props}
        multiline={props.canHaveManyLines ? true : false}
        style={{
          flex: 1,
          padding: 10,
          paddingTop: 10,
          color: styles.theme.light.text,
          ...styles.theme.font,
          fontSize: 15,
        }}
        placeholderTextColor='#aaa'
        keyboardAppearance={styles.theme.isDarkMode ? 'dark' : 'light'}
      />
      {!!props.value && !props.canHaveManyLines && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}
          onPress={() => props.onChangeText('')}
        >
          <Entypo name='circle-with-cross' size={18} color='#aaa' />
        </TouchableOpacity>
      )}
    </View>
  )
}
