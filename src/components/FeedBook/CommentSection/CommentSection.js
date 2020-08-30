import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Comment from './Comment'
import AddComment from './AddComment'
import Typography from '../../Typography'
import useTheme from '../../../util/useTheme'

export default ({ comments, userId, feedBookId }) => {
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()

  if (comments)
    return (
      <View style={{ marginTop: 10 }}>
        {!expanded &&
          comments.length > 1 &&
          comments
            .slice(0, 1)
            .map(comment => <Comment comment={comment} key={comment._id} />)}
        {(expanded || comments.length <= 1) &&
          comments.map(comment => (
            <Comment comment={comment} key={comment._id} />
          ))}
        {comments.length > 1 && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Typography style={{ color: theme.current.main }}>
              {expanded
                ? 'Hide comments'
                : `${comments.length - 1} more comments`}
            </Typography>
          </TouchableOpacity>
        )}
        <AddComment userId={userId} feedBookId={feedBookId} />
      </View>
    )
}
