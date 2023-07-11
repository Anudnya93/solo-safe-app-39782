import React, { useEffect } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Separator from '../Separator'
import Icon from '../Icon'
import CustomText from '../CustomText'
import { useColors } from '../../theme/colors'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'
import appleAuth from '@invertase/react-native-apple-authentication'
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk-next'

const SocialSignIn = ({ title, callBackHandler = () => {} }) => {
  const colors = useColors()
  const scheme = styles(colors)
  const handleFBLogin = async () => {
    try {
      await _fblogin()
    } catch (err) {
      console.log('err in catch', err)
    }
  }
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userinfo = await GoogleSignin.signIn()
      console.log({ userinfo })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress')
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE')
        // play services not available or outdated
      } else {
        // some other error happened
        console.log({ error })
      }
    }
  }

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      })
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned')
      }

      const { identityToken, nonce } = appleAuthRequestResponse
      console.log({ appleAuthRequestResponse })
    } catch (err) {
      console.log({ err })
    }
  }

  const _fblogin = () => {
    LoginManager.logOut()
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      res => {
        console.log('res of fb login', res)
        if (
          res.declinedPermissions &&
          res.declinedPermissions.includes('email')
        ) {
          Alert.alert('Email is required')
        }
        if (res.isCancelled) {
          console.error('err')
        } else {
          const req = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            (err, result) => {
              if (err) {
                console.error('err', err)
                return
              } else {
                console.log('res of login fb', result)
                if (Platform.OS === 'ios') {
                  AuthenticationToken.getAuthenticationTokenIOS().then(data => {
                    console.log(data?.authenticationToken)
                  })
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data?.accessToken.toString())
                  })
                }
                // AccessToken.getCurrentAccessToken().then(data => {
                //   console.log(data.accessToken.toString())
                // })
              }
            }
          )
          new GraphRequestManager().addRequest(req).start()
        }
      },
      err => {
        console.error('error in login', err)
      }
    )
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '146542251310-te1enqeplvk5jkmndlpto6c7g0lan5kb.apps.googleusercontent.com',
      offlineAccess: true
    })
  }, [])
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
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={[scheme.button, { marginRight: 8 }]}
            onPress={handleAppleLogin}
          >
            <Icon size={24} name="apple" family="custom" />
            <CustomText style={{ marginLeft: 8 }}>via Apple</CustomText>
          </TouchableOpacity>
        )}
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
      flex: 1,
      borderRadius: 100,
      padding: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.gray
    }
  })
