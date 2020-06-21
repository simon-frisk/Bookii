import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { AuthContext } from './util/AuthProvider'
import CloseModalButton from './components/CloseModalButton'
import BottomTabs from './util/BottomTabs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Book from './pages/Book/Book'
import AddFeedBook from './pages/AddFeedBook'
import UserSettings from './pages/UserSettings/UserSettings'
import EditFeedBook from './pages/EditFeedBook/EditFeedBook'
import User from './pages/User/User'

const Stack = createStackNavigator()

export default () => {
  const {
    _id: isSignedIn,
    initialAuthCheck,
    isInitialAuthCheckDone,
  } = useContext(AuthContext)

  useEffect(() => {
    initialAuthCheck()
  }, [])

  if (!isInitialAuthCheckDone) return <View />
  if (isInitialAuthCheckDone)
    return (
      <NavigationContainer>
        <Stack.Navigator
          mode='modal'
          headerMode='screen'
          screenOptions={{
            title: '',
            headerLeft: () => <View />,
            headerRight: () => <CloseModalButton />,
            headerTransparent: true,
            headerBackground: () => (
              <BlurView intensity={100} style={[StyleSheet.absoluteFill]} />
            ),
            headerStyle: { height: 40 },
          }}
        >
          {isSignedIn && (
            <>
              <Stack.Screen
                name='mainTabScreen'
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='book' component={Book} />
              <Stack.Screen name='addFeedBook' component={AddFeedBook} />
              <Stack.Screen name='editFeedBook' component={EditFeedBook} />
              <Stack.Screen name='user' component={User} />
              <Stack.Screen name='userSettings' component={UserSettings} />
            </>
          )}
          {!isSignedIn && (
            <>
              <Stack.Screen
                name='signup'
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='signin' component={Signin} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
}
