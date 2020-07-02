import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useStyles from '../util/useStyles'
import BookCover from './BookCover'
import PressButton from './PressButton'
import ExpandableText from './bookcard/FeedBookCard/ExpandableText'
import Typography from './Typography'
import useTheme from '../util/useTheme'
import ProfilePictureCircle from './ProfilePictureCircle'

export default ({ isSelf, style, limitWidth, user, book, feedBook }) => {
  const navigation = useNavigation()
  const Styles = useStyles()
  const theme = useTheme()
  console.log(feedBook)

  return (
    <View
      style={[
        Styles.card,
        style,
        {
          padding: 20,
          width: limitWidth ? 280 : undefined,
          alignSelf: limitWidth ? 'flex-start' : 'auto',
          marginVertical: 10,
        },
      ]}
    >
      {!!user && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('user', { _id: user._id })
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <ProfilePictureCircle
            profilePicturePath={user.profilePicturePath}
            name={user.name}
            size={45}
            style={{ marginRight: 10 }}
          />
          <Typography type='h3'>{user.name}</Typography>
        </TouchableOpacity>
      )}
      {!!book && (
        <TouchableOpacity
          onPress={() => navigation.navigate('book', { bookId: book.bookId })}
          style={{ flexDirection: 'row' }}
        >
          <BookCover uri={book.thumbnail} width={100} title={book.title} />
          <Typography type='h4' style={{ marginLeft: 10, flex: 1 }}>
            {book.title}
          </Typography>
        </TouchableOpacity>
      )}
      {!!feedBook && (
        <View style={{ marginVertical: 10 }}>
          <Typography type='h4' style={{ marginBottom: 5 }}>
            {new Date(feedBook.date).toDateString()}
          </Typography>
          <ExpandableText text={feedBook.comment} />
          {isSelf && (
            <PressButton
              text='Edit'
              color={theme.current.main}
              onPress={() =>
                navigation.navigate('editFeedBook', { _id: feedBook._id })
              }
            />
          )}
        </View>
      )}
    </View>
  )
}
