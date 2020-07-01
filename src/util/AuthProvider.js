import React, { createContext, useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [decodedAuthtoken, setDecodedAuthtoken] = useState()
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false)
  const [isLatestConsent, setIsLatestConsent] = useState(true)

  const initialAuthCheck = async () => {
    const token = await AsyncStorage.getItem('authtoken')
    if (token) signin(token)
    setIsInitialAuthCheckDone(true)
  }

  const signin = async token => {
    try {
      const decoded = jwt_decode(token)
      setDecodedAuthtoken(decoded)
      await AsyncStorage.setItem('authtoken', token)
    } catch (error) {
      signout()
    }
  }

  const signout = async () => {
    try {
      setDecodedAuthtoken(null)
      await AsyncStorage.removeItem('authtoken')
      Segment.reset()
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{
        _id: decodedAuthtoken && decodedAuthtoken._id,
        signout,
        signin,
        initialAuthCheck,
        isInitialAuthCheckDone,
        isLatestConsent,
        setIsLatestConsent,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
