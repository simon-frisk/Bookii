import React, { useContext } from 'react'
import { ScrollView, ActivityIndicator, Text } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../../util/AuthProvider'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import ApolloError from '../../components/ApolloError'
import PressButton from '../../components/PressButton'
import UserCirclesSwiper from '../../components/UserCirclesSwiper'
import DeleteProfile from './DeleteProfile'

export const UserFollowingAndFollowers = gql`
  query UserFollowingAndFollowers {
    user {
      _id
      following {
        _id
        profilePicturePath
      }
      followers {
        _id
        profilePicturePath
      }
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(UserFollowingAndFollowers)
  const { signout } = useContext(AuthContext)
  const client = useApolloClient()

  return (
    <ScrollView
      style={[Styles.pageContainer, Styles.extraHorizontalPagePadding]}
    >
      <UpdateProfile />
      {loading && <ActivityIndicator style={{ margin: 30 }} />}
      {error && <ApolloError type='errorcomponent' error={error} />}
      {!!data && !!data.user.following.length && (
        <>
          <Text style={Styles.h3}>Following</Text>
          <UserCirclesSwiper users={data.user.following} />
        </>
      )}
      {!!data && !!data.user.followers.length && (
        <>
          <Text style={Styles.h3}>Followers</Text>
          <UserCirclesSwiper users={data.user.followers} />
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
