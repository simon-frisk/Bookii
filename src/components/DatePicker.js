import React, { useState } from 'react'
import { View, Platform, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import PressButton from './PressButton'
import useStyles from '../util/useStyles'

export default ({ value, onChange }) => {
  const [show, setShow] = useState(false)
  const styles = useStyles()

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ textAlign: 'center', ...styles.h4 }}>
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
