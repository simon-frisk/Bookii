import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import User from '../pages/User/User'
import People from '../pages/People/People'
import Books from '../pages/Books/Books'

const Tabs = createBottomTabNavigator()

export default () => {
  return (
    <Tabs.Navigator initialRouteName='Me'>
      <Tabs.Screen
        name='People'
        component={People}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='user-friends' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Books'
        component={Books}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='book-open' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Me'
        component={User}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='user' size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
