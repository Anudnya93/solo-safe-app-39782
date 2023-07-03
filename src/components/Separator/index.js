import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { useColors } from '../../theme/colors'

const Separator = ({ title }) => {
  const colors = useColors()
  const scheme = styles(colors)
  return (
    <View style={scheme.container}>
      <View style={scheme.line} />
      <CustomText style={scheme.text}>{title}</CustomText>
      <View style={scheme.line} />
    </View>
  )
}

export default Separator

const styles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 10
    },
    line: { height: 1, width: '33%', backgroundColor: colors.gray },
    text: { marginHorizontal: 10, textAlign: 'center', color: colors.text }
  })
