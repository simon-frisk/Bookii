import React from 'react'
import { View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useTheme from '../util/useTheme'

export default props => {
  const theme = useTheme()

  return (
    <View
      style={[
        {
          backgroundColor: theme.light.button,
          borderColor: theme.light.button,
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
          color={theme.light.text}
        />
      )}
      <TextInput
        {...props}
        multiline={props.canHaveManyLines ? true : false}
        style={{
          flex: 1,
          paddingVertical: 3,
          color: theme.light.text,
        }}
        placeholderTextColor='#aaa'
        keyboardAppearance={theme.isDarkMode ? 'dark' : 'light'}
      />
    </View>
  )
}
