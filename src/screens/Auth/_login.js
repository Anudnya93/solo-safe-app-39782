import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useColors } from '../../theme/colors'
import CustomText from '../../components/CustomText'
import BaseScreen from '../../components/BaseScreen'

const Login = () => {
  const colors = useColors()
  const scheme = styles(colors)
  return (
    <BaseScreen>
      <CustomText>hello</CustomText>
    </BaseScreen>
  )
}

export default Login

const styles = colors => StyleSheet.create({})
