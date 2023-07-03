import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import CustomDropdown from '../../components/CustomDropdown'
import { formatPhoneNumber } from '../../helpers/utilities'
import { useColors } from '../../theme/colors'
import fonts from '../../assets/fonts'
import { hp } from '../../helpers/basicStyles'
import { useNavigation } from '@react-navigation/native'
import SocialSignIn from '../../components/SocialSignIn'
import CustomCheckBox from '../../components/CustomCheckBox'
import { signUp } from '../../network'
import { validateEmail, validatePassword } from '../../constants/regex'
import { Strings } from '../../constants/Strings'

const data = [
  { label: 'Customer', value: 1 },
  { label: 'Driver', value: 2 }
]

const SignUp = ({ setter }) => {
  const colors = useColors()
  const scheme = styles(colors)
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = React.useState(true)

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
    signUp(payload)
      .then(res => {
        console.log('res', res)
        Alert.alert('', 'Signed Up Successfully! Login to continue.', [
          {
            text: 'Login',
            onPress: () => {
              setter(1)
            }
          }
        ])
      })
      .catch(err => {
        console.error('err', err)
      })
      .finally(() => {
        setLoading(false)
      })
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

  const handleDisable = () => {
    return !(
      firstName &&
      lastName &&
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
          icon={'user'}
          label={'First Name'}
          value={firstName}
          setter={setFirstName}
          placeholder="First name"
          maxLength={50}
          style={{ marginBottom: 10 }}
        />
        <CustomInput
          icon={'user'}
          label={'Last Name'}
          value={lastName}
          setter={setLastName}
          placeholder="Last name"
          maxLength={50}
          style={{ marginBottom: 10 }}
        />
        <CustomInput
          label={'Email Address'}
          value={email}
          setter={handlemailChange}
          icon={'mail'}
          placeholder="Enter your email address"
          keyboardType="email-address"
          maxLength={250}
          style={{ marginBottom: 10 }}
          error={emailError ? Strings.EmailError : null}
        />
        <CustomInput
          label={'Phone Number'}
          value={formatPhoneNumber(phone)}
          setter={setPhone}
          icon={'phone'}
          placeholder="Enter your number"
          keyboardType="number-pad"
          maxLength={12}
          style={{ marginBottom: 10 }}
        />
        <CustomInput
          label={'Password'}
          value={password}
          setter={handlePasswordChange}
          icon={'lock'}
          placeholder="Enter your password"
          maxLength={250}
          style={{ marginBottom: 10 }}
          secureTextEntry
          error={passError ? Strings.PasswordError : null}
        />
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
            <CustomText style={{ color: colors.gray }}>
              {'I have read '}
            </CustomText>
            <CustomText onPress={handleTerms} style={{ color: colors.button }}>
              {'TERMS AND CONDITIONS'}
            </CustomText>
            <CustomText style={{ color: colors.gray }}>{' and '}</CustomText>
            <CustomText
              onPress={handlePrivacy}
              style={{ color: colors.button }}
            >
              {'PRIVACY POLICY'}
            </CustomText>
          </View>
        </View>
        {/* <SocialSignIn callBackHandler={handleSocialSignIn} /> */}
      </View>
      <CustomButton
        disabled={handleDisable()}
        onPress={handleCreate}
        label="Create Account"
        style={{ marginTop: 10 }}
        loader={loading}
      />
    </View>
  )
}

export default SignUp

const styles = colors =>
  StyleSheet.create({
    container: {
      marginTop: hp(3),
      height: '87%'
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
