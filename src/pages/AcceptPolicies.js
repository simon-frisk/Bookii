import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import Typography from '../components/Typography'
import PressButton from '../components/PressButton'
import CheckBox from 'react-native-check-box'
import useStyles from '../util/useStyles'
import useTheme from '../util/useTheme'
import useAcceptLatestPolicies from '../data/hooks/useAcceptLatestPolicies'
import { UserContext } from '../root/UserProvider'
import { ScrollView } from 'react-native-gesture-handler'

export default () => {
  const styles = useStyles()
  const theme = useTheme()
  const [agree, setAgree] = useState(false)
  const {
    callAcceptLatestPolicies,
    loading,
    errorMessage,
    data,
  } = useAcceptLatestPolicies()
  const { setIsLatestConsent } = useContext(UserContext)

  useEffect(() => {
    if (data) setIsLatestConsent(data.acceptLatestPolicies)
  }, [data])

  return (
    <ScrollView contentContainerStyle={{ padding: styles.standardPageInset }}>
      <Typography type='h2' style={{ marginBottom: 10 }}>
        Accept privacy policy
      </Typography>
      <Typography>
        The privacy policy of bookii has been updated. Find the updated policy{' '}
        <Typography
          style={{ color: theme.current.main }}
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
        leftTextStyle={{ color: theme.current.text, fontSize: 16 }}
        checkBoxColor={theme.current.text}
        style={{ marginTop: 25 }}
      />
      <Typography style={{ color: theme.current.error }}>
        {errorMessage}
      </Typography>
      <PressButton
        text='Continue'
        onPress={() => callAcceptLatestPolicies()}
        disabled={!agree}
        loading={loading}
      />
    </ScrollView>
  )
}
