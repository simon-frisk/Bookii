import React, { useContext } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { UserContext } from './UserProvider'

export default ({ children }) => {
  const { token, signout, setIsLatestConsent } = useContext(UserContext)

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(error => {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(error => {
            if (error.extensions) {
              if (error.extensions.code === 'UNAUTHENTICATED') signout()
              if (error.extensions.code === 'NOTLATESTCONSENT')
                setIsLatestConsent(false)
            }
          })
        }
      }),
      setContext(() => {
        return {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        }
      }),
      createUploadLink({
        uri: 'http://192.168.72.114:4000/',
      }),
    ]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
