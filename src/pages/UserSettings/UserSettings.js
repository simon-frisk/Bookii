import React, { useContext } from 'react'
import { View, SectionList, ActivityIndicator, Text } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from '../../util/AuthProvider'
import Styles from '../../util/Styles'
import UpdateProfile from './UpdateProfile'
import ApolloError from '../../components/ApolloError'
import UserCard from '../../components/UserCard'
import PressButton from '../../components/PressButton'

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
      <Text style={Styles.h1}>Settings</Text>
      <UpdateProfile />

      <View>
        <Text style={Styles.h3}>Sign out</Text>
        <PressButton
          text='Sign out'
          onPress={() => {
            signout()
            client.resetStore()
          }}
        />
      </View>

      <Text style={{ marginTop: 10, ...Styles.h3 }}>
        Following and Followers
      </Text>
    </>
  )

  return (
    <SectionList
      ListHeaderComponent={Top}
      contentContainerStyle={[
        Styles.pageContainer,
        Styles.extraHorizontalPagePadding,
      ]}
      ListEmptyComponent={() => {
        if (error) return <ApolloError type='errorcomponent' error={error} />
        if (loading)
          return (
            <View style={Styles.center}>
              <ActivityIndicator />
            </View>
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
        <Text style={{ marginBottom: 10, ...Styles.h4 }}>{section.title}</Text>
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
