import React, { useState, useEffect } from 'react'
import useStyles from '../../util/useStyles'
import Typography from '../Typography'
import { View, TouchableOpacity } from 'react-native'

export default ({ data, renderCell, initialLength }) => {
  const styles = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [renderCells, setRenderCells] = useState(
    initialLength ? data.slice(0, initialLength) : data
  )

  useEffect(() => {
    if (expanded) setRenderCells(data)
    else setRenderCells(renderCells.slice(0, initialLength))
  }, [expanded])

  return (
    <>
      <View
        style={{
          marginTop: styles.standardMargin,
          borderTopWidth: 0.3,
          borderTopColor: styles.theme.current.border,
        }}
      >
        {renderCells.map(renderCell)}
      </View>
      {initialLength && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={{ padding: styles.standardMargin }}
        >
          <Typography
            style={{ color: styles.theme.current.main, textAlign: 'right' }}
          >
            {expanded ? 'Less' : 'More'}
          </Typography>
        </TouchableOpacity>
      )}
    </>
  )
}
