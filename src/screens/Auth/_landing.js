import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import Login from './_login'
import BaseScreen from '../../components/BaseScreen'
import Icon from '../../components/Icon'
import { hp, wp } from '../../helpers/basicStyles'
import { useColors } from '../../theme/colors'
import CustomText from '../../components/CustomText'
import SignUp from './_signup'

const Landing = () => {
  const colors = useColors()
  const scheme = styles(colors)
  const [option, setOption] = useState(0)
  return (
    <>
      <BaseScreen containerStyle={{ paddingBottom: 0 }}>
        <View
          style={{
            marginHorizontal: 24,
            backgroundColor: colors.background,
            paddingHorizontal: 11,
            borderRadius: 10,
            marginTop: hp(5),
            minHeight: hp(85)
          }}
        >
          <Icon
            style={{ alignSelf: 'center' }}
            family="custom"
            name="logo"
            size={hp(10)}
            width={wp(80)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18
            }}
          >
            <TouchableOpacity
              onPress={() => setOption(0)}
              style={{
                width: '49%',
                paddingVertical: 12,
                borderBottomColor: option === 0 ? 'purple' : 'transparent',
                borderBottomWidth: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CustomText
                style={{
                  fontSize: 20
                }}
              >
                Sign In
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption(1)}
              style={{
                width: '49%',
                paddingVertical: 12,
                borderBottomColor: option === 1 ? 'purple' : 'transparent',
                borderBottomWidth: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CustomText
                style={{
                  fontSize: 20
                }}
              >
                Sign Up
              </CustomText>
            </TouchableOpacity>
          </View>
          {option === 0 ? <Login /> : <SignUp />}
        </View>
      </BaseScreen>
      <ImageBackground
        style={{
          height: hp(100),
          width: wp(100),
          position: 'absolute',
          zIndex: -1
        }}
        source={require('../../assets/images/backGradient.png')}
      />
    </>
  )
}

export default Landing

const styles = colors => StyleSheet.create({})
