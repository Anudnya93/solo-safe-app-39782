import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
// import { handleStoreToken } from './utilities'

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.info('Authorization status:', authStatus)
  }
  return authStatus
}

const GetFCMToken = async doTask => {
  const isAuthorised = await requestUserPermission()
  console.info('isAuthorised', typeof isAuthorised)
  if (isAuthorised === 1) {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken')
    console.info('old token', fcmtoken)
    if (!fcmtoken) {
      try {
        const token = await messaging().getToken()
        if (token) {
          console.info('new token', token)
          AsyncStorage.setItem('fcmtoken', token)
          // handleStoreToken(token)
        }
      } catch (error) {
        console.info(error, 'error in fcmtoken')
      }
    }
    NotificationListner(doTask)
  }
  messaging().onTokenRefresh(token => {
    console.info('token refresh called')
    AsyncStorage.setItem('fcmtoken', token)
    // handleStoreToken(token)
  })
}

const NotificationListner = doTask => {
  messaging().setBackgroundMessageHandler(() => Promise.resolve())

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      console.info(
        'Notification caused app to open from background state:',
        remoteMessage?.notification,
        remoteMessage?.data
      )
      doTask(remoteMessage?.data, remoteMessage?.notification)
    }
  })

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.info(
          'Notification caused app to open from quit state:',
          remoteMessage?.notification,
          remoteMessage?.data
        )
        doTask(remoteMessage?.data, remoteMessage?.notification)
      }
    })

  messaging().onMessage(async remoteMessage => {
    console.info('all info', remoteMessage.notification, remoteMessage.data)
  })
}

export { requestUserPermission, GetFCMToken, NotificationListner }
