import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../Icon'
import { useColors } from '../../theme/colors'

const CustomCheckBox = ({ style, checked, onPress }) => {
  const colors = useColors()
  const scheme = styles(colors)
  return (
    <View style={style}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        {checked ? (
          <Icon name="checked" family="custom" size={16} />
        ) : (
          <View style={scheme.sqaure} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CustomCheckBox

const styles = colors =>
  StyleSheet.create({
    sqaure: {
      height: 16,
      width: 16,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: colors.icongray
    }
  })
