import React, { useContext } from 'react'
import { AuthContext } from '../../util/AuthProvider'
import { useApolloClient } from '@apollo/react-hooks'
import { Button, View } from 'react-native'
import { ScrollView } from 'react-native'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import Typography from '../../components/Typography'

export default () => {
  const { signout } = useContext(AuthContext)
  const client = useApolloClient()

  return (
    <ScrollView contentContainerStyle={Styles.pageContainer}>
      <Typography size='h1'>Settings</Typography>
      <UpdateProfile />

      <View>
        <Typography size='h3'>Sign out</Typography>
        <Button
          title='Sign out'
          onPress={() => {
            signout()
            client.resetStore()
          }}
        />
      </View>
    </ScrollView>
  )
}
