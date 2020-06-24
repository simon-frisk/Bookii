import React, { createContext, useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import * as Segment from 'expo-analytics-segment'
import jwt_decode from 'jwt-decode'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

const IdentifyUser = gql`
  query IdentifyUserQuery($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      email
    }
  }
`

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [decodedAuthtoken, setDecodedAuthtoken] = useState()
  const [isInitialAuthCheckDone, setIsInitialAuthCheckDone] = useState(false)
  const [callIdentifyUser, { data }] = useLazyQuery(IdentifyUser, {
    onCompleted(data) {
      Segment.identifyWithTraits(data.user._id, {
        email: data.user.email,
        name: data.user.name,
      })
    },
  })

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
      callIdentifyUser({ variables: { _id: decoded._id } })
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
