import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { useColors } from '../../theme/colors'
import CustomText from '../../components/CustomText'
import BaseScreen from '../../components/BaseScreen'
import fonts from '../../assets/fonts'
import Icon from '../../components/Icon'
import { hp, wp } from '../../helpers/basicStyles'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import CustomCheckBox from '../../components/CustomCheckBox'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Separator from '../../components/Separator'
import { ScrollView } from 'react-native-gesture-handler'
import { validateEmail } from '../../constants/regex'
import SocialSignIn from '../../components/SocialSignIn'
import { Strings } from '../../constants/Strings'
import { storage } from '../../helpers/mmkv'

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
  const [rememberMe, setRememberMe] = useState(true)
  const [emailError, setEmailError] = useState(false)

  // useEffect(() => {
  //   GetFCMToken(() => {})
  //   if (!isLoading) {
  //     setLoading(false)
  //   }
  // }, [isLoading])

  useEffect(() => {
    // const creds = storage.getString('creds')
    // console.log('creds', creds)
    // if (creds) {
    //   console.log('creds', creds)
    //   const obj = JSON.parse(creds)
    //   setEmail(obj.email)
    //   setPassword(obj.password)
    // }
  }, [])

  const handleLogin = () => {
    // setLoading(p => !p)
    console.log('handlelogincalled')
    const payload = {
      username: email,
      password: password
    }
    // if (rememberMe) {
    //   storage.set('creds', JSON.stringify({ email, password }))
    // } else {
    //   storage.delete('creds')
    // }
    // dispatch(LoginActions.login(payload))
  }

  const handleForgotPassword = () => {
    navigation.navigate('forgotpassword')
  }

  const handleDisable = () => {
    return !(email && !emailError && password)
  }
  const handlemailChange = val => {
    setEmail(val)
    if (val) {
      setEmailError(!validateEmail(val))
    } else {
      setEmailError(false)
    }
  }
  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View>
        <CustomInput
          value={email}
          setter={handlemailChange}
          icon={'email'}
          placeholder="Enter your email"
          keyboardType="email-address"
          maxLength={250}
          style={{ marginBottom: 20 }}
          error={emailError ? Strings.EmailError : null}
        />
        <CustomInput
          value={password}
          setter={setPassword}
          icon={'password'}
          placeholder="Enter your password"
          maxLength={250}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Icon family="custom" name="forgot" size={14} />
            <CustomText
              onPress={handleForgotPassword}
              style={{
                fontSize: 12,
                marginLeft: 8
              }}
            >
              {'I forgot my password'}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <CustomCheckBox
              checked={rememberMe}
              onPress={() => setRememberMe(p => !p)}
            />
            <CustomText
              style={{
                fontSize: 12,
                marginLeft: 8
              }}
            >
              {'Remember me'}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 25 }}>
        <CustomButton
          disabled={handleDisable()}
          onPress={handleLogin}
          label="Sign in"
          loader={loading}
        />
        <SocialSignIn />
      </View>
    </View>
  )
}

export default Login

const styles = colors => StyleSheet.create({})
