import React from 'react'
import { StyleSheet, Text } from 'react-native'
import fonts from '../../assets/fonts'

const CustomText = ({ style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {props.children}
    </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.OpenSans
  }
})
