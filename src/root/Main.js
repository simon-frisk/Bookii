import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Segment from 'expo-analytics-segment'
import Apollo from './Apollo'
import { UserProvider } from './UserProvider'
import Root from './Root'
import useTheme from '../util/useTheme'

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
