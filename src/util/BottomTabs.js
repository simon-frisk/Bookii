import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import Me from '../pages/Me'
import Discover from '../pages/Discover/Discover'
import Feed from '../pages/Feed'

const Tabs = createBottomTabNavigator()

export default () => {
  return (
    <Tabs.Navigator initialRouteName='Me'>
      <Tabs.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='home' size={size} color={color} />
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
        component={Me}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='user' size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
