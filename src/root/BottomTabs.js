import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import User from '../pages/User/User'
import Discover from '../pages/Discover/Discover'
import People from '../pages/People/People'

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
        name='Discover'
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='compass' size={size} color={color} />
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
