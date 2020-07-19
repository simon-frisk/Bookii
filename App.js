import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { StatusBar } from 'expo-status-bar'
import * as Segment from 'expo-analytics-segment'
import Apollo from './src/root/Apollo'
import { UserProvider } from './src/root/UserProvider'
import Root from './src/root/Root'
import useStyles from './src/util/useStyles'

enableScreens()

Segment.initialize({
  iosWriteKey: 'pgqoHTiSw7nbnaqfaXSbpeOtO8PaenQx',
  androidWriteKey: 'w73900iZ9EAqus2Lo5of1BEgY5XWJWXX',
})

export default () => {
  const { theme } = useStyles()

  return (
    <UserProvider>
      <Apollo>
        <StatusBar style={theme.isDarkMode ? 'light' : 'dark'} />
        <ActionSheetProvider>
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: theme.current.background }}
            >
              <Root />
            </SafeAreaView>
          </SafeAreaProvider>
        </ActionSheetProvider>
      </Apollo>
    </UserProvider>
  )
}
