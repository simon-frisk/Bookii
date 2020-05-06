import React, { useContext } from 'react'
import Typography from './Typography'
import Center from './Center'
import { AuthContext } from '../util/AuthProvider'
import { View } from 'react-native'

export default ({ error, type }) => {
  const { signout } = useContext(AuthContext)

  const errors = []

  if (error.graphQLErrors && error.graphQLErrors.length) {
    error.graphQLErrors.forEach(error => {
      if ((error.extensions.code = 'UNAUTHORIZED')) signout()
      errors.push(error.message)
    })
  }
  if (error.networkError) errors.push('Network error')
  if (error.error) errors.push(error.error.message)

  const errorMessage = errors.join(', ')

  console.log(type)

  if (type === 'errortext')
    return <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
  else if (type === 'errorcomponent')
    return (
      <Center>
        <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
      </Center>
    )
  else return <View />
}
