import React from 'react'
import useStyles from '../util/useStyles'
import { Text, View } from 'react-native'
import Typography from './Typography'

export default ({ message }) => {
  const styles = useStyles()
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 60 }}>😭</Text>
      <Typography style={{ color: styles.theme.current.error }}>
        {message}
      </Typography>
    </View>
  )
}
