import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../BookCover'
import useStyles from '../../util/useStyles'
import Typography from './Typography'

export default ({ bookId, thumbnail, title, authors }) => {
  const navigation = useNavigation()
  const Styles = useStyles()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
      <View style={{ marginBottom: 5, marginTop: 5, flexDirection: 'row' }}>
        <BookCover uri={thumbnail} width={120} style={{ marginRight: 20 }} />
        <View style={{ flex: 1 }}>
          <Typography type='h3'>{title}</Typography>
          {!!authors && <Typography>{authors.join(' & ')}</Typography>}
        </View>
      </View>
    </TouchableOpacity>
  )
}
