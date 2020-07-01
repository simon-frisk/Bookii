import { Platform } from 'react-native'
import useTheme from './useTheme'

export default () => {
  const theme = useTheme()

  return {
    standardPageInset: 20,
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 25,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 50,
      marginHorizontal: 20,
    },
    h1: {
      fontSize: 34,
      ...Platform.select({
        ios: { fontFamily: 'Arial Rounded MT Bold' },
      }),
      fontWeight: '600',
      color: theme.isDarkMode ? 'white' : 'black',
    },
    h2: {
      fontSize: 28,
      ...Platform.select({
        ios: { fontFamily: 'Arial Rounded MT Bold' },
      }),
      fontWeight: '500',
      color: theme.isDarkMode ? 'white' : 'black',
    },
    h3: {
      fontSize: 22,
      ...Platform.select({
        ios: { fontFamily: 'Arial Rounded MT Bold' },
      }),
      fontWeight: '500',
      color: theme.isDarkMode ? 'white' : 'black',
    },
    h4: {
      fontSize: 20,
      ...Platform.select({
        ios: { fontFamily: 'Arial Rounded MT Bold' },
      }),
      fontWeight: '500',
      color: theme.isDarkMode ? 'white' : 'black',
    },
    bodyText: {
      fontSize: 17,
      color: theme.isDarkMode ? 'white' : 'black',
    },
  }
}
