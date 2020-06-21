import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FlatList, ActivityIndicator } from 'react-native'
import ApolloError from '../../components/ApolloError'
import Center from '../../components/Center'
import UserCard from '../../components/UserCard'
import Styles from '../../util/Styles'

const UsersPage = gql`
  query UsersPage {
    users {
      _id
      name
      profilePicturePath
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(UsersPage)

  return (
    <FlatList
      ListEmptyComponent={() => {
        if (error) return <ApolloError type='errorcomponent' error={error} />
        if (loading)
          return (
            <Center>
              <ActivityIndicator />
            </Center>
          )
      }}
      contentContainerStyle={Styles.pageContainer}
      data={data ? data.users : []}
      keyExtractor={({ _id }, index) => _id + index}
      renderItem={({ item: user }) => (
        <UserCard
          name={user.name}
          _id={user._id}
          profilePicturePath={user.profilePicturePath}
        />
      )}
    />
  )
}
