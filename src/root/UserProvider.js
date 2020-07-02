import React, { createContext, useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import jwt_decode from 'jwt-decode'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false)
  const [token, setToken] = useState()
  const [_id, set_id] = useState()
  const [isLatestConsent, setIsLatestConsent] = useState(true)

  const initialAuthCheck = async () => {
    const token = await AsyncStorage.getItem('authtoken')
    if (token) signin(token)
    setIsInitialAuthCheckDone(true)
  }

  const signin = async token => {
    try {
      const { _id } = jwt_decode(token)
      setToken(token)
      set_id(_id)
      await AsyncStorage.setItem('authtoken', token)
    } catch (error) {
      console.log('Error in signin', error)
      signout()
    }
  }

  const signout = async () => {
    try {
      setToken(null)
      set_id(null)
      await AsyncStorage.removeItem('authtoken')
      Segment.reset()
    } catch (error) {}
  }

  return (
    <UserContext.Provider
      value={{
        _id,
        token,
        signout,
        signin,
        initialAuthCheck,
        isInitialAuthCheckDone,
        isLatestConsent,
        setIsLatestConsent,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
