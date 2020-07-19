import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import UserSearchQuery from '../../data/graphql/UserSearchQuery'
import TextField from '../../components/TextField'
import { ActivityIndicator } from 'react-native'
import useApolloError from '../../util/useApolloError'
import Typography from '../../components/Typography'
import UserSlider from '../../components/UserSlider'
import useStyles from '../../util/useStyles'
import useTheme from '../../util/useTheme'

export default () => {
  const [callQuery, { data, loading, error }] = useLazyQuery(UserSearchQuery)
  const errorMessage = useApolloError(error)
  const [query, setQuery] = useState('')
  const Styles = useStyles()
  const theme = useTheme()

  useEffect(() => callQuery({ variables: { name: query } }), [query])

  return (
    <>
      <TextField
        value={query}
        icon='search'
        onChangeText={setQuery}
        style={{ margin: Styles.standardMargin }}
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
            color: theme.current.error,
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
