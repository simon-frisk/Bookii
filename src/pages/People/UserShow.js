import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Typography from '../../components/Typography'
import UserSlider from '../../components/UserSlider'
import useStyles from '../../util/useStyles'

export default ({ recommended, following }) => {
  const [mode, setMode] = useState('following')
  const styles = useStyles()

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: styles.standardMargin,
          marginTop: styles.standardMargin,
        }}
      >
        <TouchableOpacity onPress={() => setMode('following')}>
          <Typography
            type={mode === 'following' ? 'h3' : 'h4'}
            style={{
              color: mode === 'following' ? styles.theme.current.text : 'grey',
            }}
          >
            Following
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('recommended')}>
          <Typography
            type={mode === 'recommended' ? 'h3' : 'h4'}
            style={{
              color:
                mode === 'recommended' ? styles.theme.current.text : 'grey',
            }}
          >
            Recommended
          </Typography>
        </TouchableOpacity>
      </View>
      <UserSlider users={mode === 'following' ? following : recommended} />
    </>
  )
}
