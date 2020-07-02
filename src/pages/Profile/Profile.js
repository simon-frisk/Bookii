import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import * as WebBrowser from 'expo-web-browser'
import gql from 'graphql-tag'
import { UserContext } from '../../util/UserProvider'
import useStyles from '../../util/useStyles'
import UpdateProfile from './UpdateProfile'
import PressButton from '../../components/PressButton'
import UserSlider from '../../components/UserSlider'
import DeleteProfile from './DeleteProfile'
import useApolloError from '../../util/useApolloError'
import ChangePassword from './ChangePassword'
import Typography from '../../components/Typography'
import useTheme from '../../util/useTheme'

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
  const Styles = useStyles()
  const theme = useTheme()
  const { data, loading, error } = useQuery(UserFollowingAndFollowers)
  const errorMessage = useApolloError(error)
  const { signout } = useContext(UserContext)
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
        <Typography style={{ color: theme.current.error }}>
          {errorMessage}
        </Typography>
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
          <Typography type='h2'>Following</Typography>
          <UserSlider users={data.user.following} />
        </>
      )}
      {!!data.user.followers.length && (
        <>
          <Typography type='h2'>Followers</Typography>
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
        <Typography type='h2'>More</Typography>
        <Typography>
          For more info, like viewing privacy policy or getting support, visit
          the{' '}
          <Typography
            style={{ color: theme.current.main }}
            onPress={() =>
              WebBrowser.openBrowserAsync('https://bookii.simonfrisk.com')
            }
          >
            Bookii website
          </Typography>
        </Typography>
      </View>
    </ScrollView>
  )
}
