import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import { AuthContext } from '../util/AuthProvider'
import CloseModalButton from '../components/CloseModalButton'
import BottomTabs from './BottomTabs'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Book from '../pages/Book/Book'
import AddFeedBook from '../pages/AddFeedBook'
import Profile from '../pages/Profile/Profile'
import EditFeedBook from '../pages/EditFeedBook/EditFeedBook'
import User from '../pages/User/User'

const Stack = createStackNavigator()

export default () => {
  const { _id, initialAuthCheck, isInitialAuthCheckDone } = useContext(
    AuthContext
  )
  const navRef = useRef()
  const routeNameRef = useRef()

  useEffect(() => {
    initialAuthCheck()
  }, [])

  useEffect(() => {
    if (!routeNameRef.current && navRef.current) {
      const navState = navRef.current.getRootState()
      const routeName = getActiveRouteName(navState)
      routeNameRef.current = routeName
      reportRouteIfChanged(routeName, null)
    }
  })

  if (!isInitialAuthCheckDone) return <View />
  return (
    <NavigationContainer
      ref={navRef}
      onStateChange={navState => {
        const routeName = getActiveRouteName(navState)
        reportRouteIfChanged(routeName, routeNameRef.current)
        routeNameRef.current = routeName
      }}
    >
      <Stack.Navigator
        mode='card'
        headerMode='float'
        screenOptions={{
          title: '',
          headerLeft: () => <View />,
          headerRight: () => <CloseModalButton />,
          headerTransparent: true,
        }}
      >
        {_id ? (
          <>
            <Stack.Screen name='mainTabScreen' component={BottomTabs} />
            <Stack.Screen name='book' component={Book} />
            <Stack.Screen name='addFeedBook' component={AddFeedBook} />
            <Stack.Screen name='editFeedBook' component={EditFeedBook} />
            <Stack.Screen name='user' component={User} />
            <Stack.Screen name='profile' component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name='signup' component={Signup} />
            <Stack.Screen name='signin' component={Signin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function getActiveRouteName(navState) {
  const route = navState.routes[navState.index]
  if (route.state) return getActiveRouteName(route.state)
  return route.name
}

function reportRouteIfChanged(currentRouteName, prevRouteName) {
  if (prevRouteName !== currentRouteName) {
    Segment.screen(currentRouteName)
  }
}
