import { Platform } from 'react-native'

const font = Platform.select({
  ios: { fontFamily: 'Arial Rounded MT Bold' },
})

export default {
  standardPageInset: 20,
  card: {
    backgroundColor: 'white',
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
    fontSize: 40,
    ...font,
    fontWeight: '600',
  },
  h2: {
    fontSize: 33,
    ...font,
    fontWeight: '500',
  },
  h3: {
    fontSize: 24,
    ...font,
    fontWeight: '500',
  },
  h4: {
    fontSize: 20,
    ...font,
    fontWeight: '500',
  },
}
