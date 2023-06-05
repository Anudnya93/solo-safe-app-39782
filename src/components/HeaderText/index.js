import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import fonts from '../../assets/fonts'

const HeaderText = ({ children, style, ...rest }) => {
  return (
    <View>
      <Text style={[styles.textStyle, style]} {...rest}>
        {children}
      </Text>
    </View>
  )
}

export default HeaderText

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.OpenSansBold,
    fontSize: 18
  }
})
