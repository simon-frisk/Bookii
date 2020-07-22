import React from 'react'
import useStyles from '../../util/useStyles'
import Typography from '../Typography'
import { View } from 'react-native'

export default ({ title, children }) => {
  const styles = useStyles()

  return (
    <>
      {title && (
        <Typography
          type='h2'
          style={{
            marginHorizontal: styles.standardMargin,
            marginVertical: styles.standardMargin / 2,
          }}
        >
          {title}
        </Typography>
      )}
      <View
        style={{
          borderTopWidth: 0.3,
          borderTopColor: styles.theme.current.border,
        }}
      >
        {children}
      </View>
    </>
  )
}
