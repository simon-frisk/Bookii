import React from 'react'
import { SafeAreaView } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { StatusBar } from 'expo-status-bar'
import apolloClient from './util/Apollo'
import { AuthProvider } from './util/AuthProvider'
import Root from './root/Root'

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <StatusBar />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
          <Root />
        </SafeAreaView>
      </AuthProvider>
    </ApolloProvider>
  )
}
