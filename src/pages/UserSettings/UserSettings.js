import React, { useContext } from 'react'
import { AuthContext } from '../../util/AuthProvider'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button, View, SectionList, ActivityIndicator } from 'react-native'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import Typography from '../../components/Typography'
import ApolloError from '../../components/ApolloError'
import Center from '../../components/Center'
import UserCard from '../../components/UserCard'

export const UserFollowingAndFollowers = gql`
  query UserFollowingAndFollowers {
    user {
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
  const { signout } = useContext(AuthContext)
  const client = useApolloClient()

  const Top = () => (
    <>
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

      <Typography size='h3' style={{ marginTop: 10 }}>
        Following and Followers
      </Typography>
    </>
  )

  return (
    <SectionList
      ListHeaderComponent={Top}
      contentContainerStyle={Styles.pageContainer}
      ListEmptyComponent={() => {
        if (error) return <ApolloError type='errorcomponent' error={error} />
        if (loading)
          return (
            <Center>
              <ActivityIndicator />
            </Center>
          )
      }}
      sections={
        data
          ? [
              { title: 'Following', data: data.user.following },
              { title: 'Followers', data: data.user.followers },
            ]
          : []
      }
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <Typography size='h4' style={{ marginBottom: 10 }}>
          {section.title}
        </Typography>
      )}
      renderItem={({ item: user }) => (
        <UserCard
          _id={user._id}
          name={user.name}
          profilePicturePath={user.profilePicturePath}
        />
      )}
      keyExtractor={(item, index) => item._id + index}
    />
  )
}
