import React, { useState } from 'react'
import { View, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Typography from './Typography'
import PressButton from './PressButton'

export default ({ value, onChange }) => {
  const [show, setShow] = useState(false)

  return (
    <View style={{ padding: 10 }}>
      <Typography size='h4' style={{ textAlign: 'center' }}>
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
