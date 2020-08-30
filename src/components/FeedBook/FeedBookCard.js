import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useStyles from '../../util/useStyles'
import BookCover from '../Book/BookCover'
import PressButton from '../PressButton'
import ExpandableText from '../ExpandableText'
import Typography from '../Typography'
import CommentSection from './CommentSection/CommentSection'
import UserSection from './UserSection'
import useTheme from '../../util/useTheme'

export default ({ isSelf, style, limitWidth, feedBook }) => {
  const navigation = useNavigation()
  const Styles = useStyles()
  const theme = useTheme()

  return (
    <View
      style={[
        Styles.card,
        style,
        {
          width: limitWidth ? 320 : undefined,
          alignSelf: limitWidth ? 'flex-start' : 'auto',
          marginVertical: Styles.standardMargin / 2,
        },
      ]}
    >
      <UserSection isSelf={isSelf} user={feedBook.user} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('book', { bookId: feedBook.book.bookId })
        }
        style={{ flexDirection: 'row' }}
      >
        <BookCover uri={feedBook.book.thumbnail} width={80} />
        <View
          style={{
            flex: 1,
            marginLeft: Styles.standardMargin,
            justifyContent: 'space-between',
          }}
        >
          <Typography type='h3'>{feedBook.book.title}</Typography>
          {isSelf && (
            <PressButton
              text='Edit'
              color={theme.current.main}
              containerStyle={{ alignSelf: 'flex-end' }}
              onPress={() =>
                navigation.navigate('editFeedBook', { _id: feedBook._id })
              }
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: Styles.standardMargin }}>
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
        <CommentSection
          comments={feedBook.comments}
          userId={feedBook.user._id}
          feedBookId={feedBook._id}
        />
      </View>
    </View>
  )
}
