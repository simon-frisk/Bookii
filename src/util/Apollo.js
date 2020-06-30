import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { AsyncStorage } from 'react-native'

export default new ApolloClient({
  link: ApolloLink.from([
    setContext(async () => {
      const token = await AsyncStorage.getItem('authtoken')
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    }),
    createUploadLink({
      uri: 'http://192.168.72.114:4000',
    }),
  ]),
  cache: new InMemoryCache(),
})
