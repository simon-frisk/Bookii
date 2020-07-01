import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ProfilePictureCircle from '../../ProfilePictureCircle'
import useStyles from '../../../util/useStyles'
import Typography from '../../Typography'

export default ({ isSelf, user_id, book_id, profilePicturePath, name }) => {
  const navigation = useNavigation()
  const Styles = useStyles()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!isSelf) navigation.navigate('user', { _id: user_id })
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <ProfilePictureCircle
          profilePicturePath={profilePicturePath}
          name={name}
          size={45}
          style={{ marginRight: 10 }}
        />
        <Typography type='h3'>{name}</Typography>
      </TouchableOpacity>
      {isSelf && (
        <TouchableOpacity
          onPress={() => navigation.navigate('editFeedBook', { _id: book_id })}
          style={{ padding: 7 }}
        >
          <SimpleLineIcons name='options-vertical' size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}
