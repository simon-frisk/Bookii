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
        paddingVertical: styles.doubleMargin,
        marginVertical: styles.doubleMargin,
      }}
    >
      <Typography type='h2' style={{ marginHorizontal: styles.standardMargin }}>
        On youtube
      </Typography>
      <FlatList
        data={videoIds}
        horizontal={true}
        contentContainerStyle={{ marginTop: styles.doubleMargin }}
        renderItem={({ item: id }) => (
          <View
            style={{
              marginHorizontal: styles.standardMargin,
              marginBottom: styles.standardMargin,
            }}
          >
            <YoutubePlayer
              ref={playerRef}
              height={180}
              width={320}
              videoId={id}
              play={false}
              onChangeState={event => console.log(event)}
              onReady={() => console.log('ready')}
              onError={e => console.log(e)}
              onPlaybackQualityChange={q => console.log(q)}
              volume={50}
              playbackRate={1}
            />
          </View>
        )}
      />
    </View>
  )
}
