import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Separator from '../Separator'
import Icon from '../Icon'
import CustomText from '../CustomText'
import { useColors } from '../../theme/colors'

const SocialSignIn = ({ title, callBackHandler = () => {} }) => {
  const colors = useColors()
  const scheme = styles(colors)
  const handleFBLogin = () => {
    callBackHandler()
  }
  const handleGoogleLogin = () => {
    callBackHandler()
  }
  const handleAppleLogin = () => {
    callBackHandler()
  }
  return (
    <>
      <Separator title={'Or'} />
      <TouchableOpacity
        style={[scheme.button, { width: '100%' }]}
        onPress={handleGoogleLogin}
      >
        <Icon size={24} name="google" family="custom" />
        <CustomText style={{ marginLeft: 8 }}>Sign in with Google</CustomText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity style={scheme.button} onPress={handleAppleLogin}>
          <Icon size={24} name="apple" family="custom" />
          <CustomText style={{ marginLeft: 8 }}>via Apple</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={scheme.button} onPress={handleFBLogin}>
          <Icon size={24} name="facebook" family="custom" />
          <CustomText style={{ marginLeft: 8 }}>via Facebook</CustomText>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default SocialSignIn

const styles = colors =>
  StyleSheet.create({
    socialContainer: {
      flexDirection: 'row',
      width: '60%',
      alignSelf: 'center',
      marginVertical: 20
    },
    button: {
      width: '49%',
      borderRadius: 100,
      padding: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.gray
    }
  })
