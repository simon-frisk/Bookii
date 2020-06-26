const shadow = {
  shadowColor: 'black',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  backgroundColor: 'white',
}

export default {
  pageContainer: {
    padding: '4%',
  },
  standardMargin: {
    margin: '4%',
  },
  extraHorizontalPagePadding: {
    paddingVertical: 40,
  },
  shadow: shadow,
  card: {
    ...shadow,
    borderRadius: 10,
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
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: '600',
  },
  h2: {
    fontSize: 33,
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: '500',
  },
  h3: {
    fontSize: 24,
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: '500',
  },
  h4: {
    fontSize: 20,
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: '500',
  },
}
