import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import CustomText from '../CustomText'
import fonts from '../../assets/fonts'
import { useColors } from '../../theme/colors'

const CustomButton = ({
  textStyle,
  style,
  label,
  onPress,
  loader,
  disabled
}) => {
  const colors = useColors()
  const scheme = styles(colors)
  return (
    <TouchableOpacity
      disabled={disabled || loader}
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        scheme.button,
        style,
        disabled && { backgroundColor: colors.gray }
      ]}
    >
      {loader ? (
        <ActivityIndicator color={'white'} size={24.5} />
      ) : (
        <CustomText style={[scheme.text, textStyle]}>{label}</CustomText>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = colors =>
  StyleSheet.create({
    button: {
      width: '100%',
      backgroundColor: colors.button,
      padding: 15,
      alignItems: 'center',
      borderRadius: 10
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontFamily: fonts.OpenSansMedium
    }
  })
