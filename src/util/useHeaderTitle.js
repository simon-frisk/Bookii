import { useNavigation, useFocusEffect } from '@react-navigation/native'

export default title => {
  const navigation = useNavigation()

  useFocusEffect(() => {
    const parentNav = navigation.dangerouslyGetParent()
    if (parentNav) parentNav.setOptions({ title })
    else navigation.setOptions({ title })
  })
}
