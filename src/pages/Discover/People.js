import React from 'react'
import { FlatList, ActivityIndicator, View, Text } from 'react-native'
import UserCard from '../../components/UserCard'
import Styles from '../../util/Styles'
import usePeoplePage from '../../data/hooks/usePeoplePage'

export default () => {
  const { data, loading, errorMessage } = usePeoplePage()

  return (
    <FlatList
      ListEmptyComponent={() => {
        if (errorMessage)
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
      contentContainerStyle={{ padding: Styles.standardPageInset }}
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
