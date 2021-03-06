import React, { useState, useEffect, useContext } from 'react'
import * as WebBrowser from 'expo-web-browser'
import Typography from '../components/Typography'
import PressButton from '../components/PressButton'
import CheckBox from 'react-native-check-box'
import useStyles from '../util/useStyles'
import { UserContext } from '../root/UserProvider'
import { ScrollView } from 'react-native-gesture-handler'
import useHeaderTitle from '../util/useHeaderTitle'
import { useMutation } from '@apollo/react-hooks'
import useApolloError from '../util/useApolloError'
import gql from 'graphql-tag'

const Mutation = gql`
  mutation AcceptLatestPolicies {
    acceptLatestPolicies
  }
`

export default () => {
  const styles = useStyles()
  const [agree, setAgree] = useState(false)
  const [callMutation, { loading, error, data }] = useMutation(Mutation)
  const errorMessage = useApolloError(error)
  const { setIsLatestConsent } = useContext(UserContext)
  useHeaderTitle('Privacy policy')

  useEffect(() => {
    if (data) setIsLatestConsent(data.acceptLatestPolicies)
  }, [data])

  return (
    <ScrollView contentContainerStyle={{ padding: styles.standardMargin }}>
      <Typography>
        The privacy policy of bookii has been updated. Find the updated policy{' '}
        <Typography
          style={{ color: styles.theme.current.main }}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://bookii.simonfrisk.com/privacypolicy'
            )
          }
        >
          here
        </Typography>
      </Typography>
      <CheckBox
        leftText='I have read and agree with the privacy policy'
        isChecked={agree}
        onClick={() => setAgree(!agree)}
        leftTextStyle={{ color: styles.theme.current.text, fontSize: 16 }}
        checkBoxColor={styles.theme.current.text}
        style={{ marginTop: 25 }}
      />
      <Typography style={{ color: styles.theme.current.error }}>
        {errorMessage}
      </Typography>
      <PressButton
        text='Continue'
        onPress={() => callMutation()}
        disabled={!agree}
        loading={loading}
      />
    </ScrollView>
  )
}
