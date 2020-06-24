import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import useApolloError from '../../util/useApolloError'
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
  const errorMessage = useApolloError(error)

  return (
    <FlatList
      ListEmptyComponent={() => {
        if (error)
          return (
            <View style={Styles.center}>
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            </View>
          )
        if (loading)
          return (
            <View style={Styles.center}>
              <ActivityIndicator />
            </View>
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
