import React, { useContext } from 'react'
import { AuthContext } from '../util/AuthProvider'
import { View, Text } from 'react-native'
import Styles from '../util/Styles'

export default ({ error, type }) => {
  const { signout } = useContext(AuthContext)

  const errors = []

  if (error.graphQLErrors && error.graphQLErrors.length) {
    error.graphQLErrors.forEach(error => {
      if (error.extensions.code === 'UNAUTHORIZED') signout()
      errors.push(error.message)
    })
  }
  if (error.networkError) errors.push('Network error')
  if (error.error) errors.push(error.error.message)

  const errorMessage = errors.join(', ')

  if (type === 'errortext')
    return <Text style={{ color: 'red' }}>{errorMessage}</Text>
  else if (type === 'errorcomponent')
    return (
      <View style={Styles.center}>
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      </View>
    )
  else return <View />
}
