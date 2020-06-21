import React, { useState } from 'react'
import { View, Platform, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import PressButton from './PressButton'
import Styles from '../util/Styles'

export default ({ value, onChange }) => {
  const [show, setShow] = useState(false)

  return (
    <View style={{ padding: 10 }}>
      <Text size='h4' style={{ textAlign: 'center', ...Styles.h4 }}>
        {new Date(value).toDateString()}
      </Text>
      {show && (
        <DateTimePicker
          value={value}
          mode='date'
          display='default'
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || date
            setShow(Platform.OS === 'ios')
            onChange(currentDate)
          }}
        />
      )}
      <PressButton onPress={() => setShow(!show)} text='Set date' />
    </View>
  )
}
