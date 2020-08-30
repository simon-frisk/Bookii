import React from 'react'
import { View } from 'react-native'
import ProfilePictureCircle from '../../ProfilePictureCircle'
import Typography from '../../Typography'
import DeleteComment from './DeleteComment'

export default ({ comment, userId, feedBookId, isSelf }) => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
    >
      <ProfilePictureCircle
        profilePicturePath={comment.user.profilePicturePath}
        name={comment.user.name}
        size={40}
      />
      <Typography style={{ flex: 1, marginLeft: 10 }}>
        {comment.comment}
      </Typography>
      {isSelf && (
        <DeleteComment
          userId={userId}
          feedBookId={feedBookId}
          _id={comment._id}
        />
      )}
    </View>
  )
}
