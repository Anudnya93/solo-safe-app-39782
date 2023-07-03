import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Separator from '../Separator'
import Icon from '../Icon'

const SocialSignIn = ({ title, callBackHandler = () => {} }) => {
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
      <Separator title="Or Sign up with" />
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleFBLogin}>
          <Icon size={43} name="fb" family="custom" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleLogin}>
          <Icon size={43} name="google" family="custom" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppleLogin}>
          <Icon size={43} name="apple" family="custom" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default SocialSignIn

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 20
  }
})
