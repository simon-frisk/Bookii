import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, Text, View } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import gql from 'graphql-tag'
import { AuthContext } from '../../util/AuthProvider'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import PressButton from '../../components/PressButton'
import UserSlider from '../../components/UserSlider'
import DeleteProfile from './DeleteProfile'
import useApolloError from '../../util/useApolloError'
import ChangePassword from './ChangePassword'

export const UserFollowingAndFollowers = gql`
  query UserFollowingAndFollowers {
    user {
      _id
      name
      email
      profilePicturePath
      following {
        _id
        name
        profilePicturePath
      }
      followers {
        _id
        name
        profilePicturePath
      }
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(UserFollowingAndFollowers)
  const errorMessage = useApolloError(error)
  const { signout } = useContext(AuthContext)
  const client = useApolloClient()

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (error)
    return (
      <View style={Styles.center}>
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ padding: Styles.standardPageInset }}>
      <UpdateProfile
        name={data.user.name}
        profilePicturePath={data.user.profilePicturePath}
        email={data.user.email}
      />
      <ChangePassword />
      {!!data.user.following.length && (
        <>
          <Text style={Styles.h2}>Following</Text>
          <UserSlider users={data.user.following} />
        </>
      )}
      {!!data.user.followers.length && (
        <>
          <Text style={Styles.h2}>Followers</Text>
          <UserSlider users={data.user.followers} />
        </>
      )}
      <View style={{ marginTop: 35 }}>
        <PressButton
          text='Sign out'
          onPress={() => {
            signout()
            client.resetStore()
          }}
        />
        <DeleteProfile _id={data.user._id} />
      </View>
      <View style={{ marginVertical: 35 }}>
        <Text style={Styles.h2}>More</Text>
        <Text>
          For more info, like viewing privacy policy or getting support, visit
          the{' '}
          <Text
            style={{ color: 'blue' }}
            onPress={() =>
              WebBrowser.openBrowserAsync('https://bookii.simonfrisk.com')
            }
          >
            Bookii website
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}
