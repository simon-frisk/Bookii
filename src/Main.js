import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { StatusBar } from 'expo-status-bar'
import * as Segment from 'expo-analytics-segment'
import apolloClient from './util/Apollo'
import { AuthProvider } from './util/AuthProvider'
import Root from './root/Root'
import useTheme from './util/useTheme'

Segment.initialize({
  iosWriteKey: 'pgqoHTiSw7nbnaqfaXSbpeOtO8PaenQx',
  androidWriteKey: 'dygrpZ2dKfi7LKmIGQqmxAreCDTUBXCy',
})

export default () => {
  const theme = useTheme()

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <StatusBar style={theme.isDarkMode ? 'light' : 'dark'} />
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Root />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
