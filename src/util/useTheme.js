import { useColorScheme } from 'react-native-appearance'

const light = {
  primary: 'white',
  background: 'rgb(235, 235, 240)',
  text: 'rgb(25,25,27)',
  reverseText: 'rgb(235, 235, 240)',
  button: 'rgb(216, 216, 220)',
  main: '#007AFF',
  complement: '#FF9500',
  error: '#FF3B30',
}
const dark = {
  primary: 'rgb(25,25,27)',
  background: 'black',
  text: 'rgb(235, 235, 240)',
  reverseText: 'rgb(25,25,27)',
  button: 'rgb(235, 235, 240)',
  main: '#0A84FF',
  complement: '#FF9F0A',
  error: '#FF453A',
}

export default () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  return {
    current: isDarkMode ? dark : light,
    dark,
    light,
    isDarkMode,
  }
}
