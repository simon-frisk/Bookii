import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default error => {
  const { signout, setIsLatestConsent } = useContext(AuthContext)

  if (!error) return
  console.log(error)
  if (error.graphQLErrors.length) {
    return error.graphQLErrors
      .map(error => {
        if (error.extentions && error.extensions.code === 'UNAUTHENTICATED')
          signout()
        if (error.extensions && error.extensions.code === 'NOTLATESTCONSENT')
          setIsLatestConsent(false)
        return error.message
      })
      .join(', ')
  }
  if (error.networkError) return 'Network error'
  if (error.error) return error.error.message
  return 'Unknown error occured'
}
