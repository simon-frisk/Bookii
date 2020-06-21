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
    padding: '3%',
  },
  standardMargin: {
    margin: '3%',
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
  },
  h1: {
    fontSize: 39,
  },
  h2: {
    fontSize: 32,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 16,
  },
}
