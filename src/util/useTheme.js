import { useColorScheme } from 'react-native-appearance'

const light = {
  primary: 'white',
  background: '#f2f2f2',
  border: 'rgb(224, 224, 224)',
  text: 'rgb(25,25,27)',
  reverseText: 'rgb(235, 235, 240)',
  main: '#007AFF',
  complement: '#FF9500',
  error: '#FF3B30',
}
const dark = {
  primary: 'rgb(36,36,38)',
  background: 'rgb(0,0,5)',
  border: 'rgb(68, 68, 70)',
  text: 'rgb(235, 235, 240)',
  reverseText: 'rgb(25,25,27)',
  main: '#0A84FF',
  complement: '#FF9F0A',
  error: '#FF453A',
}

const font = Platform.select({
  ios: { fontFamily: 'Arial Rounded MT Bold' },
  android: { fontFamily: 'Roboto' },
})

export default () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const current = isDarkMode ? dark : light

  return {
    font,
    current,
    dark,
    light,
    isDarkMode,
    theme: {
      dark: isDarkMode,
      colors: {
        background: current.background,
        border: current.border,
        card: current.primary,
        primary: current.main,
        text: current.text,
      },
    },
  }
}
