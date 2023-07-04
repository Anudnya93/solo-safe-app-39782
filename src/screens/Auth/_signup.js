import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useColors } from '../../theme/colors'
import fonts from '../../assets/fonts'
import { hp } from '../../helpers/basicStyles'
import { useNavigation } from '@react-navigation/native'
import SocialSignIn from '../../components/SocialSignIn'
import CustomCheckBox from '../../components/CustomCheckBox'
import { signUp } from '../../network'
import { validateEmail, validatePassword } from '../../constants/regex'
import { Strings } from '../../constants/Strings'

const SignUp = ({ setter }) => {
  const colors = useColors()
  const scheme = styles(colors)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = React.useState(true)
  const [rememberMe, setRememberMe] = useState(false)

  const toggleCheckbox = () => setChecked(prev => !prev)

  const handleCreate = () => {
    setLoading(true)
    const payload = {
      name: firstName,
      last_name: lastName,
      email: email,
      phone_no: phone.replaceAll('-', ''),
      user_type: userType,
      password: password
    }
    // signUp(payload)
    //   .then(res => {
    //     console.log('res', res)
    //     Alert.alert('', 'Signed Up Successfully! Login to continue.', [
    //       {
    //         text: 'Login',
    //         onPress: () => {
    //           setter(1)
    //         }
    //       }
    //     ])
    //   })
    //   .catch(err => {
    //     console.error('err', err)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }

  const handleTerms = () => {
    navigation.navigate('terms')
  }
  const handlePrivacy = () => {
    navigation.navigate('privacy')
  }
  const handlemailChange = val => {
    setEmail(val)
    if (val) {
      setEmailError(!validateEmail(val))
    } else {
      setEmailError(false)
    }
  }
  const handlePasswordChange = val => {
    setPassword(val)
    if (val) {
      setPassError(!validatePassword(val))
    } else {
      setPassError(false)
    }
  }
  const handleConfirmPasswordChange = val => {
    setConfirmPassword(val)
    if (val) {
      setConfirmPasswordError(val !== password)
    } else {
      setConfirmPasswordError(false)
    }
  }

  const handleDisable = () => {
    return !(
      name &&
      email &&
      !emailError &&
      phone.length == 12 &&
      password &&
      !passError &&
      userType
    )
  }

  return (
    <View style={scheme.container}>
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
          icon={'user'}
          value={name}
          setter={setName}
          placeholder="Enter your name"
          maxLength={50}
          style={{ marginBottom: 20 }}
        />
        <CustomInput
          value={password}
          setter={handlePasswordChange}
          icon={'password'}
          placeholder="Enter your password"
          maxLength={250}
          style={{ marginBottom: 20 }}
          secureTextEntry
          error={passError ? Strings.PasswordError : null}
        />
        <CustomInput
          value={confirmPassword}
          setter={handleConfirmPasswordChange}
          icon={'password'}
          placeholder="Re-enter your password"
          maxLength={250}
          style={{ marginBottom: 10 }}
          secureTextEntry
          error={confirmPasswordError ? Strings.ConfirmPassError : null}
        />
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
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <CustomCheckBox
            style={{ marginRight: 10 }}
            checked={checked}
            onPress={toggleCheckbox}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            <CustomText style={{ fontSize: 12 }}>{'I have read '}</CustomText>
            <CustomText
              onPress={handleTerms}
              style={{ color: colors.blueBorder, fontSize: 12 }}
            >
              {Strings.TermsAndConditions}
            </CustomText>
            <CustomText style={{ fontSize: 12 }}>{' and '}</CustomText>
            <CustomText
              onPress={handlePrivacy}
              style={{ color: colors.blueBorder, fontSize: 12 }}
            >
              {Strings.PrivacyPolicy}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 25 }}>
        <CustomButton
          disabled={handleDisable()}
          onPress={handleCreate}
          label="Sign Up"
          loader={loading}
        />
        <SocialSignIn />
      </View>
    </View>
  )
}

export default SignUp

const styles = colors =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flex: 1
    },
    dropDownSelectedText: {
      fontSize: 14,
      fontFamily: fonts.OpenSans
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      alignSelf: 'center',
      marginVertical: 20
    }
  })
