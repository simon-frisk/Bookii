import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from './src/util/Apollo'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/util/AuthProvider'
import Main from './src/Main'

export default () => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <Main />
      </SafeAreaView>
    </AuthProvider>
  </ApolloProvider>
)
