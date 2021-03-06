import React, { useContext, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { View } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Book from '../pages/Book/Book'
import AddFeedBook from '../pages/AddFeedBook'
import Profile from '../pages/Profile/Profile'
import EditFeedBook from '../pages/EditFeedBook/EditFeedBook'
import User from '../pages/User/User'
import AcceptPolicies from '../pages/AcceptPolicies'
import useStyles from '../util/useStyles'
import BottomTabs from './BottomTabs'
import useIdentifyUser from './useIdentifyUser'
import { UserContext } from './UserProvider'
import ForgotPassword from '../pages/ForgotPassword'
import BookList from '../pages/BookList'
import Category from '../pages/Category'

const Stack = createNativeStackNavigator()

export default () => {
  const {
    _id,
    initialAuthCheck,
    isInitialAuthCheckDone,
    isLatestConsent,
  } = useContext(UserContext)
  const { callIdentifyUser } = useIdentifyUser()
  const navRef = useRef()
  const routeNameRef = useRef()
  const { theme } = useStyles()

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

  if (!isInitialAuthCheckDone) return <View />
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
        screenOptions={{
          headerBackTitle: 'Back',
          headerTopInsetEnabled: true,
          headerLargeTitleStyle: { ...theme.font, fontSize: 40 },
          headerStyle: { backgroundColor: theme.current.background },
          headerTitleStyle: theme.font,
          title: '',
        }}
      >
        {_id ? (
          isLatestConsent ? (
            <>
              <Stack.Screen
                name='mainTabScreen'
                component={BottomTabs}
                options={{ headerLargeTitle: true }}
              />
              <Stack.Screen name='book' component={Book} />
              <Stack.Screen name='bookList' component={BookList} />
              <Stack.Screen name='addFeedBook' component={AddFeedBook} />
              <Stack.Screen name='editFeedBook' component={EditFeedBook} />
              <Stack.Screen name='category' component={Category} />
              <Stack.Screen
                name='user'
                component={User}
                options={{ headerLargeTitle: true }}
              />
              <Stack.Screen
                name='profile'
                component={Profile}
                options={{ headerLargeTitle: true }}
              />
            </>
          ) : (
            <Stack.Screen
              name='updateconsent'
              component={AcceptPolicies}
              options={{ headerLargeTitle: true }}
            />
          )
        ) : (
          <>
            <Stack.Screen name='signup' component={Signup} />
            <Stack.Screen name='signin' component={Signin} />
            <Stack.Screen name='forgotpassword' component={ForgotPassword} />
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
