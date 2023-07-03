import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { formatPhoneNumber } from '../../helpers/utilities'
import { useColors } from '../../theme/colors'
import fonts from '../../assets/fonts'
import { hp } from '../../helpers/basicStyles'
import { useNavigation } from '@react-navigation/native'
import SocialSignIn from '../../components/SocialSignIn'
import { login } from '../../network'
import { useDispatch, useSelector } from 'react-redux'
import { LoginActions } from '../../store/actions/login.actions'
import CustomDropdown from '../../components/CustomDropdown'
import { GetFCMToken } from '../../helpers/pushNotification'

const data = [
  { label: 'Customer', value: 1 },
  { label: 'Driver', value: 2 }
]

const Login = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.login.loginData.loading)
  const colors = useColors()
  const scheme = styles(colors)
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState(1)

  useEffect(() => {
    GetFCMToken(() => {})
    if (!isLoading) {
      setLoading(false)
    }
  }, [isLoading])

  const handleLogin = () => {
    setLoading(true)
    const payload = {
      username: email,
      password: password,
      user_type: userType.toString()
    }
    dispatch(LoginActions.login(payload))
  }

  const handleForgotPassword = () => {
    navigation.navigate('forgotpassword')
  }

  const handleDisable = () => {
    return !(email && password)
  }

  return (
    <View style={scheme.container}>
      <View>
        <CustomDropdown
          placeholder="Select user type"
          data={data}
          value={userType}
          setter={item => {
            setUserType(item.value)
          }}
          title={'User Type'}
        />
        <CustomInput
          label={'Email Address'}
          value={email}
          setter={setEmail}
          icon={'mail'}
          placeholder="Enter your email address"
          keyboardType="email-address"
          maxLength={250}
        />
        <CustomInput
          label={'Password'}
          value={password}
          setter={setPassword}
          icon={'lock'}
          placeholder="Enter your password"
          maxLength={250}
          style={{ marginTop: 20 }}
          secureTextEntry
        />
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
      </View>
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
    </View>
  )
}

export default Login

const styles = colors =>
  StyleSheet.create({
    container: {
      marginTop: hp(3),
      height: '87%'
    }
  })
