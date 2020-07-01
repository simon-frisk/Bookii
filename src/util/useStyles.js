import useTheme from './useTheme'

export default () => {
  const theme = useTheme()

  return {
    standardPageInset: 20,
    card: {
      backgroundColor: theme.primary,
      borderRadius: 25,
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
