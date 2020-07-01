import React, { useContext, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import { AuthContext } from '../util/AuthProvider'
import CloseScreenButton from './CloseScreenButton'
import BottomTabs from './BottomTabs'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Book from '../pages/Book/Book'
import AddFeedBook from '../pages/AddFeedBook'
import Profile from '../pages/Profile/Profile'
import EditFeedBook from '../pages/EditFeedBook/EditFeedBook'
import User from '../pages/User/User'
import AcceptPolicies from '../pages/AcceptPolicies'
import useTheme from '../util/useTheme'
import useInitialIdentifyUser from '../util/useInitialIdentifyUser'

const Stack = createStackNavigator()

export default () => {
  const {
    _id,
    initialAuthCheck,
    isInitialAuthCheckDone,
    isLatestConsent,
  } = useContext(AuthContext)

  const { callIdentifyUser, hasIdentifiedUser } = useInitialIdentifyUser()

  const navRef = useRef()
  const routeNameRef = useRef()

  useEffect(() => {
    initialAuthCheck()
  }, [])

  useEffect(() => {
    if (_id) callIdentifyUser({ variables: { _id } })
  }, [_id])

  useEffect(() => {
    if (!routeNameRef.current && navRef.current) {
      const navState = navRef.current.getRootState()
      const routeName = getActiveRouteName(navState)
      routeNameRef.current = routeName
      reportRouteIfChanged(routeName, null)
    }
  })

  const theme = useTheme()

  if (!isInitialAuthCheckDone || (_id && !hasIdentifiedUser)) return <View />
  return (
    <NavigationContainer
      theme={theme.theme}
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
          headerRight: () => <CloseScreenButton />,
          headerTransparent: true,
        }}
      >
        {_id ? (
          isLatestConsent ? (
            <>
              <Stack.Screen name='mainTabScreen' component={BottomTabs} />
              <Stack.Screen name='book' component={Book} />
              <Stack.Screen name='addFeedBook' component={AddFeedBook} />
              <Stack.Screen name='editFeedBook' component={EditFeedBook} />
              <Stack.Screen name='user' component={User} />
              <Stack.Screen name='profile' component={Profile} />
            </>
          ) : (
            <Stack.Screen name='updateconsent' component={AcceptPolicies} />
          )
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
