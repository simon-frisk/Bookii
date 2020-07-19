import useTheme from './useTheme'

export default () => {
  const theme = useTheme()

  return {
    standardMargin: 14,
    doubleMargin: 28,
    card: {
      backgroundColor: theme.current.primary,
      borderRadius: 25,
      padding: 18,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 50,
      marginHorizontal: 20,
    },
  }
}
