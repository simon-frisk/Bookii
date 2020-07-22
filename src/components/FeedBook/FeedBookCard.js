import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useStyles from '../../util/useStyles'
import BookCover from '../Book/BookCover'
import PressButton from '../PressButton'
import ExpandableText from '../ExpandableText'
import Typography from '../Typography'
import ProfilePictureCircle from '../ProfilePictureCircle'

export default ({ isSelf, style, limitWidth, feedBook }) => {
  const navigation = useNavigation()
  const Styles = useStyles()

  return (
    <View
      style={[
        Styles.card,
        style,
        {
          width: limitWidth ? 290 : undefined,
          alignSelf: limitWidth ? 'flex-start' : 'auto',
          marginVertical: Styles.standardMargin / 2,
        },
      ]}
    >
      {!!feedBook.user && (
        <TouchableOpacity
          disabled={isSelf}
          onPress={() => {
            navigation.navigate('user', { _id: feedBook.user._id })
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <ProfilePictureCircle
            profilePicturePath={feedBook.user.profilePicturePath}
            name={feedBook.user.name}
            size={50}
            style={{ marginRight: 10 }}
          />
          <Typography type='h3'>{feedBook.user.name}</Typography>
        </TouchableOpacity>
      )}
      {!!feedBook.book && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('book', { bookId: feedBook.book.bookId })
          }
          style={{ flexDirection: 'row' }}
        >
          <BookCover uri={feedBook.book.thumbnail} width={100} />
          <Typography type='h4' style={{ marginLeft: 10, flex: 1 }}>
            {feedBook.book.title}
          </Typography>
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 8 }}>
        <Typography type='h4'>
          {new Date(feedBook.date).toDateString()}
        </Typography>
        {!!feedBook.comment && (
          <ExpandableText
            text={feedBook.comment}
            style={{ marginTop: 5 }}
            extractLength={limitWidth ? 40 : 110}
          />
        )}
        {isSelf && (
          <PressButton
            text='Edit'
            onPress={() =>
              navigation.navigate('editFeedBook', { _id: feedBook._id })
            }
            containerStyle={{ paddingVertical: 0 }}
          />
        )}
      </View>
    </View>
  )
}
