import React, { useRef, useState } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Typography from '../../components/Typography'
import useStyles from '../../util/useStyles'
import useTheme from '../../util/useTheme'

export default ({ videoIds }) => {
  const playerRef = useRef()
  const styles = useStyles()
  const theme = useTheme()

  return (
    <View
      style={{
        backgroundColor: theme.current.primary,
        marginTop: styles.doubleMargin,
        marginBottom: styles.standardMargin,
        paddingVertical: styles.standardMargin,
      }}
    >
      <Typography type='h2' style={{ marginHorizontal: styles.standardMargin }}>
        On youtube
      </Typography>
      <FlatList
        data={videoIds}
        horizontal={true}
        contentContainerStyle={{
          marginTop: styles.standardMargin,
          paddingRight: styles.standardMargin,
        }}
        renderItem={({ item: id }) => (
          <View
            style={{
              marginLeft: styles.standardMargin,
              marginBottom: 10,
            }}
          >
            <YoutubePlayer
              ref={playerRef}
              height={180}
              width={320}
              videoId={id}
              play={false}
              volume={50}
              playbackRate={1}
            />
          </View>
        )}
      />
    </View>
  )
}
