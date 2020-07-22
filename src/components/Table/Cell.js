import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Typography from '../Typography'
import useStyles from '../../util/useStyles'
import { SimpleLineIcons } from '@expo/vector-icons'

export default ({ title, Left, onPress }) => {
  const styles = useStyles()

  return (
    <TouchableOpacity
      style={{
        backgroundColor: styles.theme.current.primary,
        paddingHorizontal: styles.standardMargin,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderTopColor: styles.theme.current.border,
        borderBottomColor: styles.theme.current.border,
      }}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {Left && <Left />}
        <Typography style={{ paddingLeft: Left ? 10 : 0 }}>
          {title.length > 33 ? title.slice(0, 29).concat(' ...') : title}
        </Typography>
      </View>
      {onPress && (
        <SimpleLineIcons
          name='arrow-right'
          size={14}
          color={styles.theme.current.text}
        />
      )}
    </TouchableOpacity>
  )
}
