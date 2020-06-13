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
      uri: 'https://bookiiapp.herokuapp.com/',
    }),
  ]),
  cache: new InMemoryCache(),
})
