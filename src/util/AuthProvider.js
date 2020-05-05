import React, { createContext, useState } from 'react'
import { AsyncStorage } from 'react-native'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [decodedAuthtoken, setDecodedAuthtoken] = useState()
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false)

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
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{
        userId: decodedAuthtoken && decodedAuthtoken.userId,
        signout,
        signin,
        initialAuthCheck,
        isInitialAuthCheckDone,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
