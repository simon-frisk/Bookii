import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { AuthContext } from './util/AuthProvider'
import CloseModalButton from './components/CloseModalButton'
import BottomTabs from './util/BottomTabs'
import Signin from './pages/Signin'
import Book from './pages/Book/Book'
import AddFeedBook from './pages/AddFeedBook/AddFeedBook'
import UserSettings from './pages/UserSettings/UserSettings'
import EditFeedBook from './pages/EditFeedBook/EditFeedBook'

const Stack = createStackNavigator()

export default () => {
  const { userId, initialAuthCheck, isInitialAuthCheckDone } = useContext(
    AuthContext
  )

  useEffect(() => {
    initialAuthCheck()
  }, [])

  if (isInitialAuthCheckDone)
    return (
      <NavigationContainer>
        <Stack.Navigator
          mode='modal'
          headerMode='float'
          screenOptions={{
            headerTransparent: true,
            title: '',
            headerLeft: () => <View />,
            headerRight: () => <CloseModalButton />,
          }}
        >
          {userId && (
            <>
              <Stack.Screen name='mainTabScreen' component={BottomTabs} />
              <Stack.Screen name='book' component={Book} />
              <Stack.Screen name='addFeedBook' component={AddFeedBook} />
              <Stack.Screen name='editFeedBook' component={EditFeedBook} />
              <Stack.Screen name='userSettings' component={UserSettings} />
            </>
          )}
          {!userId && <Stack.Screen name='signin' component={Signin} />}
        </Stack.Navigator>
      </NavigationContainer>
    )
  return <View />
}
