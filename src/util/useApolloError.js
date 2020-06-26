import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default error => {
  const { signout } = useContext(AuthContext)

  if (!error) return
  if (error.graphQLErrors.length) {
    return error.graphQLErrors
      .map(error => {
        if (error.extensions.code === 'UNAUTHENTICATED') signout()
        return error.message
      })
      .join(', ')
  }
  if (error.networkError) return 'Network error'
  if (error.error) return error.error.message
  return 'Unknown error occured'
}
