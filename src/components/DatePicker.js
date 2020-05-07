import React, { useState } from 'react'
import { View, Button, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Typography from './Typography'

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
      <Button onPress={() => setShow(!show)} title='Set date' />
    </View>
  )
}
