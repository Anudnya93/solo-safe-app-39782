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
import LinearGradient from 'react-native-linear-gradient'

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
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#D90CA0', '#86007B']}
        style={[scheme.button, style]}
      >
        {loader ? (
          <ActivityIndicator color={'white'} size={20} />
        ) : (
          <CustomText style={[scheme.text, textStyle]}>{label}</CustomText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = colors =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      borderRadius: 100
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontFamily: fonts.OpenSansSemiBold
    }
  })
