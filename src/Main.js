import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { StatusBar } from 'expo-status-bar'
import * as Segment from 'expo-analytics-segment'
import apolloClient from './util/Apollo'
import { AuthProvider } from './util/AuthProvider'
import Root from './root/Root'

Segment.initialize({
  iosWriteKey: 'pgqoHTiSw7nbnaqfaXSbpeOtO8PaenQx',
  androidWriteKey: 'dygrpZ2dKfi7LKmIGQqmxAreCDTUBXCy',
})

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <StatusBar />
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <Root />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
