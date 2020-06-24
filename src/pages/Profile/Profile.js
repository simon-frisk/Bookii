import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, Text } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../../util/AuthProvider'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import PressButton from '../../components/PressButton'
import UserSlider from '../../components/UserSlider'
import DeleteProfile from './DeleteProfile'
import useApolloError from '../../util/useApolloError'

export const UserFollowingAndFollowers = gql`
  query UserFollowingAndFollowers {
    user {
      _id
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

  return (
    <ScrollView
      style={[Styles.pageContainer, Styles.extraHorizontalPagePadding]}
    >
      <UpdateProfile />
      {loading && <ActivityIndicator style={{ margin: 30 }} />}
      {error && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      {!!data && !!data.user.following.length && (
        <>
          <Text style={Styles.h3}>Following</Text>
          <UserSlider users={data.user.following} />
        </>
      )}
      {!!data && !!data.user.followers.length && (
        <>
          <Text style={Styles.h3}>Followers</Text>
          <UserSlider users={data.user.followers} />
        </>
      )}
      <PressButton
        text='Sign out'
        onPress={() => {
          signout()
          client.resetStore()
        }}
      />
      {data && <DeleteProfile _id={data.user._id} />}
    </ScrollView>
  )
}
