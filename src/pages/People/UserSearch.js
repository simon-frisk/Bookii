import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import TextField from '../../components/TextField'
import { ActivityIndicator } from 'react-native'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import UserSlider from '../../components/UserSlider'
import useStyles from '../../util/useStyles'
import gql from 'graphql-tag'

const UserSearchQuery = gql`
  query UserSearch($name: String!) {
    userSearch(name: $name) {
      _id
      name
      profilePicturePath
    }
  }
`

export default () => {
  const [callQuery, { data, loading, error }] = useLazyQuery(UserSearchQuery)
  const errorMessage = useApolloError(error)
  const [query, setQuery] = useState('')
  const Styles = useStyles()

  useEffect(() => callQuery({ variables: { name: query } }), [query])

  return (
    <>
      <TextField
        value={query}
        icon='search'
        onChangeText={setQuery}
        style={{
          marginHorizontal: Styles.standardMargin,
          marginVertical: Styles.standardMargin,
        }}
        placeholder='Search'
      />
      {loading && !!query && (
        <ActivityIndicator style={{ padding: 10, textAlign: 'center' }} />
      )}
      {errorMessage && (
        <Typography
          style={{
            padding: 10,
            textAlign: 'center',
            color: Styles.theme.current.error,
          }}
        >
          {errorMessage}
        </Typography>
      )}
      {!!data && !!data.userSearch.length && (
        <UserSlider users={data.userSearch} />
      )}
    </>
  )
}
