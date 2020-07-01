import React from 'react'
import { ScrollView, View, ActivityIndicator, Text } from 'react-native'
import useStyles from '../../util/useStyles'
import useUpdateFeedBookPage from '../../data/hooks/useUpdateFeedBookPage'
import DeleteButton from './DeleteButton'
import Edit from './Edit'

export default ({ route, navigation }) => {
  const { data, loading, errorMessage } = useUpdateFeedBookPage({
    _id: route.params._id,
  })
  const Styles = useStyles()

  if (errorMessage)
    return (
      <View style={Styles.center}>
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      </View>
    )

  if (loading)
    return (
      <View style={Styles.center}>
        <ActivityIndicator />
      </View>
    )

  if (data) {
    const feedBook = data.user.feedBooks[0]
    if (!feedBook) return <View />
    return (
      <ScrollView style={{ padding: Styles.standardPageInset }}>
        <Text style={Styles.h1}>{feedBook.book.title}</Text>
        <Edit
          _id={feedBook._id}
          comment={feedBook.comment}
          date={feedBook.date}
          favorite={feedBook.favorite}
          onCompleted={navigation.goBack}
        />
        <DeleteButton
          _id={feedBook._id}
          bookId={feedBook.bookId}
          onCompleted={navigation.goBack}
        />
      </ScrollView>
    )
  }
}
