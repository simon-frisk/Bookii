import React, { useContext } from 'react'
import Typography from './Typography'
import { AuthContext } from '../util/AuthProvider'
import { View } from 'react-native'
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
    return <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
  else if (type === 'errorcomponent')
    return (
      <View style={Styles.center}>
        <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
      </View>
    )
  else return <View />
}
