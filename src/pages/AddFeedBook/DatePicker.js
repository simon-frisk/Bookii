import React, { useState } from 'react'
import { View, Button, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default ({ value, onChange }) => {
  const [show, setShow] = useState(false)

  return (
    <View>
      <Button onPress={() => setShow(!show)} title='Toggle datepicker' />
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
    </View>
  )
}
