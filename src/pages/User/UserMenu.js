import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InAppropriateButton from './InAppropriateButton'
import useStyles from '../../util/useStyles'

export default ({ _id, isFlagged }) => {
  const Styles = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          margin: Styles.standardPageInset / 2,
          padding: Styles.standardPageInset / 2,
        },
        isOpen && Styles.card,
      ]}
    >
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <MaterialCommunityIcons name='dots-vertical' size={30} color='black' />
        <View style={{ margin: 10 }}>
          {isOpen && <InAppropriateButton _id={_id} isFlagged={isFlagged} />}
        </View>
      </TouchableOpacity>
    </View>
  )
}
