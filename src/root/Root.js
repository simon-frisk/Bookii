import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
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

  useEffect(() => {
    initialAuthCheck()
  }, [])

  if (!isInitialAuthCheckDone) return <View />
  return (
    <NavigationContainer>
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
