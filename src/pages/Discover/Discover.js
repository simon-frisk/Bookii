import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TopLists from './TopLists'
import Search from './Search'

const Tab = createMaterialTopTabNavigator()

export default () => {
  return (
    <Tab.Navigator tabBarOptions={{ style: { paddingTop: 20 } }}>
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Toplists' component={TopLists} />
    </Tab.Navigator>
  )
}
