import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Segment from 'expo-analytics-segment'
import Apollo from './util/Apollo'
import { UserProvider } from './util/UserProvider'
import useTheme from '../util/useTheme'
import Root from './Root'

Segment.initialize({
  iosWriteKey: 'pgqoHTiSw7nbnaqfaXSbpeOtO8PaenQx',
  androidWriteKey: 'w73900iZ9EAqus2Lo5of1BEgY5XWJWXX',
})

export default () => {
  const theme = useTheme()

  return (
    <UserProvider>
      <Apollo>
        <StatusBar style={theme.isDarkMode ? 'light' : 'dark'} />
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.current.background }}
          >
            <Root />
          </SafeAreaView>
        </SafeAreaProvider>
      </Apollo>
    </UserProvider>
  )
}
