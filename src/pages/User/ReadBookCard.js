import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Styles from '../../util/Styles'
import BookCover from '../../components/BookCover'
import PressButton from '../../components/PressButton'

export default ({
  isSelf,
  feedBookId,
  bookId,
  thumbnail,
  title,
  comment,
  date,
  style,
}) => {
  const navigation = useNavigation()

  return (
    <View
      style={[
        Styles.card,
        style,
        {
          padding: 20,
          width: 280,
          alignSelf: 'flex-start',
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
        <View style={{ flexDirection: 'row' }}>
          <BookCover uri={thumbnail} width={100} />
          <Text style={[Styles.h4, { marginLeft: 20, flex: 1 }]}>{title}</Text>
        </View>
        <Text style={{ fontWeight: 'bold' }}>
          {new Date(date).toDateString()}
        </Text>
        <Text>{comment}</Text>
        {isSelf && (
          <PressButton
            text='Edit'
            type='filled'
            onPress={() =>
              navigation.navigate('editFeedBook', { _id: feedBookId })
            }
          />
        )}
      </TouchableOpacity>
    </View>
  )
}
