import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BookCover from './BookCover'
import Styles from '../util/Styles'

export default ({ bookId, thumbnail, title, authors }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
      <View style={{ marginBottom: 5, marginTop: 5, flexDirection: 'row' }}>
        <BookCover uri={thumbnail} width={120} style={{ marginRight: 20 }} />
        <View style={{ flex: 1 }}>
          <Text style={Styles.h3}>{title}</Text>
          {!!authors && <Text>{authors.join(' & ')}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}
