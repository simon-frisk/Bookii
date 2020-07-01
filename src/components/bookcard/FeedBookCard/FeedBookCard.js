import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useStyles from '../../../util/useStyles'
import BookCover from '../../BookCover'
import PressButton from '../../PressButton'
import ExpandableText from './ExpandableText'
import Typography from '../../Typography'
import useTheme from '../../../util/useTheme'

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
  const Styles = useStyles()
  const theme = useTheme()

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
          <BookCover uri={thumbnail} width={90} />
          <View
            style={{ flex: 1, justifyContent: 'space-between', marginLeft: 12 }}
          >
            <Typography type='h4'>{title}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              {new Date(date).toDateString()}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableText text={comment} />
      {isSelf && (
        <PressButton
          text='Edit'
          color={theme.current.main}
          onPress={() =>
            navigation.navigate('editFeedBook', { _id: feedBookId })
          }
        />
      )}
    </View>
  )
}
