import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useColors } from '../../theme/colors'
import CustomText from '../../components/CustomText'
import BaseScreen from '../../components/BaseScreen'
import fonts from '../../assets/fonts'
import Icon from '../../components/Icon'
import { hp, wp } from '../../helpers/basicStyles'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const colors = useColors()
  const scheme = styles(colors)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.login.loginData.loading)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(1)

  // useEffect(() => {
  //   GetFCMToken(() => {})
  //   if (!isLoading) {
  //     setLoading(false)
  //   }
  // }, [isLoading])

  const handleLogin = () => {
    setLoading(true)
    const payload = {
      username: email,
      password: password,
      user_type: userType.toString()
    }
    // dispatch(LoginActions.login(payload))
  }

  const handleForgotPassword = () => {
    navigation.navigate('forgotpassword')
  }

  const handleDisable = () => {
    return !(email && password)
  }
  return (
    <BaseScreen>
      <Icon family="custom" name="logo" size={hp(20)} width={wp(80)} />
      <CustomInput
        label={'Email Address'}
        value={email}
        setter={setEmail}
        icon={'email'}
        placeholder="Enter your email address"
        keyboardType="email-address"
        maxLength={250}
      />
      <CustomInput
        label={'Password'}
        value={password}
        setter={setPassword}
        icon={'password'}
        placeholder="Enter your password"
        maxLength={250}
        style={{ marginTop: 20 }}
        secureTextEntry
      />
      <Icon family="custom" name="forgot" size={20} />
      <CustomText
        onPress={handleForgotPassword}
        style={{
          fontFamily: fonts.OpenSansMedium,
          color: colors.button,
          marginVertical: 23,
          alignSelf: 'flex-end'
        }}
      >
        {'Forgot Password'}
      </CustomText>
      {/* </View> */}
      {/* <SocialSignIn callBackHandler={handleSocialSignIn} /> */}
      <CustomButton
        disabled={handleDisable()}
        onPress={handleLogin}
        label="Sign in"
        style={{
          position: 'absolute',
          bottom: hp(10)
        }}
        loader={loading}
      />
    </BaseScreen>
  )
}

export default Login

const styles = colors => StyleSheet.create({})
