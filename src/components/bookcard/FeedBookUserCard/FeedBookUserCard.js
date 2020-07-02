import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BookCover from '../../BookCover'
import useStyles from '../../../util/useStyles'
import Typography from '../..//Typography'
import ProfilePictureCircle from '../../ProfilePictureCircle'

export default ({
  bookId,
  title,
  thumbnail,
  profilePicturePath,
  user_id,
  name,
  comment,
  date,
}) => {
  const navigation = useNavigation()
  const Styles = useStyles()

  return (
    <View style={[Styles.card, { marginVertical: 10, padding: 20 }]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('user', { _id: user_id })
        }}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          name={name}
          size={45}
          style={{ marginRight: 10 }}
        />
        <Typography type='h3'>{name}</Typography>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('book', { bookId })}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <BookCover uri={thumbnail} width={110} title={title} />
          <View
            style={{ flex: 1, justifyContent: 'space-between', marginLeft: 12 }}
          >
            <Typography type='h3'>{title}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              {new Date(date).toDateString()}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
      <Typography style={{ marginTop: 10 }}>{comment}</Typography>
    </View>
  )
}
