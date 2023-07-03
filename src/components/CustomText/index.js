import React from 'react'
import { StyleSheet, Text } from 'react-native'
import fonts from '../../assets/fonts'
import { useColors } from '../../theme/colors'

const CustomText = ({ style, ...props }) => {
  const colors = useColors()
  const scheme = styles(colors)
  return (
    <Text allowFontScaling={false} style={[scheme.text, style]} {...props}>
      {props.children}
    </Text>
  )
}

export default CustomText

const styles = colors =>
  StyleSheet.create({
    text: {
      fontFamily: fonts.OpenSans,
      color: colors.text
    }
  })
