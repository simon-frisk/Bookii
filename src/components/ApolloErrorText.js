import React from 'react'
import Typography from './Typography'

export default ({ error }) => {
  const errors = []

  if (error.graphQLErrors && error.graphQLErrors.length)
    errors.push(error.graphQLErrors.map(error => error.message))
  if (error.networkError) errors.push('Network error')
  if (error.error) errors.push(error.error.message)

  const errorMessage = errors.join(', ')

  return <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
}
