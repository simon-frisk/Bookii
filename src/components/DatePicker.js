import React, { useState } from 'react'
import { View, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import PressButton from './PressButton'
import Typography from './Typography'

export default ({ value, onChange }) => {
  const [show, setShow] = useState(false)

  return (
    <View style={{ paddingVertical: 10 }}>
      <Typography type='h4' style={{ textAlign: 'center' }}>
        {new Date(value).toDateString()}
      </Typography>
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
