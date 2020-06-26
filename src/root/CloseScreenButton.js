import React from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'

export default () => {
  const navigation = useNavigation()
  const isStackNotEmpty = useNavigationState(state => state.index)

  const close = () => {
    navigation.goBack()
  }

  if (isStackNotEmpty)
    return (
      <TouchableOpacity onPress={close} style={{ marginRight: 20 }}>
        <AntDesign name='closecircle' size={23} color='#444' />
      </TouchableOpacity>
    )
  return <View />
}
