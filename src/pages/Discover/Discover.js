import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TopLists from './TopLists'
import Search from './Search'
import People from './People'

const Tab = createMaterialTopTabNavigator()

export default () => {
  return (
    <Tab.Navigator tabBarOptions={{ style: { paddingTop: 20 } }}>
      <Tab.Screen name='search' component={Search} />
      <Tab.Screen name='toplists' component={TopLists} />
      <Tab.Screen name='people' component={People} />
    </Tab.Navigator>
  )
}
