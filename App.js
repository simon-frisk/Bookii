import 'react-native-gesture-handler'
import React from 'react'
import Routes from './src/Routes'
import { ApolloProvider } from '@apollo/react-hooks'
import { AuthProvider } from './src/util/AuthProvider'
import { StatusBar } from 'react-native'
import apolloClient from './src/util/Apollo'

export default () => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <StatusBar barStyle='dark-content' />
      <Routes />
    </AuthProvider>
  </ApolloProvider>
)
