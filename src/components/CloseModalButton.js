import React from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default () => {
  const navigation = useNavigation()
  const isStackNotEmpty = useNavigationState(state => state.index)

  const close = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={close} style={{ padding: 10 }}>
      {!!isStackNotEmpty && (
        <AntDesign name='closecircle' size={20} color='grey' />
      )}
    </TouchableOpacity>
  )
}
