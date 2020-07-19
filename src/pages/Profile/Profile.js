import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, View } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import * as WebBrowser from 'expo-web-browser'
import gql from 'graphql-tag'
import { UserContext } from '../../root/UserProvider'
import useStyles from '../../util/useStyles'
import UpdateProfile from './UpdateProfile'
import PressButton from '../../components/PressButton'
import UserSlider from '../../components/UserSlider'
import DeleteProfile from './DeleteProfile'
import useApolloError from '../../util/useApolloError'
import ChangePassword from './ChangePassword'
import Typography from '../../components/Typography'
import ChangeProfilePicture from './ChangeProfilePicture'
import useHeaderTitle from '../../util/useHeaderTitle'
import FollowingAndFollowersQuery from '../../queries/FollowingAndFollowersQuery'
import ErrorCenter from '../../components/ErrorCenter'

export default () => {
  const Styles = useStyles()
  const { data, loading, error } = useQuery(FollowingAndFollowersQuery)
  const errorMessage = useApolloError(error)
  const { signout } = useContext(UserContext)
  const client = useApolloClient()
  useHeaderTitle('Profile')

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (error) return <ErrorCenter message={errorMessage} />

  return (
    <ScrollView>
      <ChangeProfilePicture
        profilePicturePath={data.user.profilePicturePath}
        name={data.user.name}
      />
      <UpdateProfile name={data.user.name} email={data.user.email} />
      <ChangePassword />
      {!!data.user.following.length && (
        <View
          style={{
            marginTop: Styles.doubleMargin,
            marginHorizontal: Styles.standardMargin,
          }}
        >
          <Typography type='h2'>Following</Typography>
          <UserSlider users={data.user.following} />
        </View>
      )}
      {!!data.user.followers.length && (
        <View
          style={{
            marginHorizontal: Styles.standardMargin,
          }}
        >
          <Typography type='h2'>Followers</Typography>
          <UserSlider users={data.user.followers} />
        </View>
      )}
      <View
        style={{
          marginTop: Styles.standardMargin,
          marginHorizontal: Styles.standardMargin,
        }}
      >
        <PressButton
          text='Sign out'
          onPress={() => {
            signout()
            client.resetStore()
          }}
        />
        <DeleteProfile _id={data.user._id} />
      </View>
      <View
        style={{
          marginVertical: Styles.standardMargin,
          marginHorizontal: Styles.standardMargin,
        }}
      >
        <Typography type='h2'>More</Typography>
        <Typography>
          For more info, like viewing privacy policy or getting support, visit
          the{' '}
          <Typography
            style={{ color: Styles.theme.current.main }}
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
