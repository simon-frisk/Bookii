import React from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import useStyles from '../../util/useStyles'

export default ({ uri, width, style, loading }) => {
  const styles = useStyles()

  return (
    <View style={style}>
      {!uri && (
        <View
          style={{
            width,
            height: width * 1.5,
            backgroundColor: styles.theme.current.primary,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Entypo
              name='image-inverted'
              size={width / 3}
              color={styles.theme.current.text}
            />
          )}
        </View>
      )}
      {uri && (
        <Image
          source={{ uri }}
          style={{
            width,
            height: width * 1.5,
            resizeMode: 'contain',
          }}
        />
      )}
    </View>
  )
}
