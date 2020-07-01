import { useColorScheme } from 'react-native-appearance'

export default () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  return {
    colors: {
      main: isDarkMode ? '#0A84FF' : '#007AFF',
      mainComplement: isDarkMode ? '#FF9F0A' : '#FF9500',
      error: isDarkMode ? '#FF453A' : '#FF3B30',
      card: isDarkMode ? 'rgb(25,25,27)' : 'white',
      background: isDarkMode ? 'black' : 'white',
      text: isDarkMode ? 'white' : 'black',
    },
    isDarkMode,
  }
}
