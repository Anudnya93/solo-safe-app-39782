import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
  AppState,
  Platform
} from 'react-native'
import Icon from '../../components/Icon'

let LockDetectionEmitter
let andListener

if (Platform.OS === 'ios') {
  const { LockDetection } = NativeModules
  LockDetection.registerforDeviceLockNotif()
  LockDetectionEmitter = new NativeEventEmitter(LockDetection)
} else if (Platform.OS === 'android') {
  LockDetectionEmitter = new NativeEventEmitter(NativeModules.PhoneLocked)
}

const Home = () => {
  const handleLockStatusChange = newStatus => {
    console.log('newstat', newStatus)
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      LockDetectionEmitter.addListener(
        'LockStatusChange',
        handleLockStatusChange
      )
    } else if (Platform.OS === 'android') {
      LockDetectionEmitter.addListener('EventReminder', res => {
        // listen here for screen on or off action
        console.log(res.action) // ACTION_USER_PRESENT || ACTION_SCREEN_OFF || ACTION_SCREEN_ON
      })
    }

    // android another implementation better working

    // const eventEmitter = new NativeEventEmitter(NativeModules.PhoneLocked)

    // eventEmitter.addListener('EventReminder', res => {
    //   // listen here for screen on or off action
    //   console.log(res.action) // ACTION_USER_PRESENT || ACTION_SCREEN_OFF || ACTION_SCREEN_ON
    // })

    // android implementation 2 end

    return () => {
      if (Platform.OS === 'ios') {
        LockDetectionEmitter.removeListener(
          'LockStatusChange',
          handleLockStatusChange
        )
      } else if (Platform.OS === 'android') {
      }
      // clearInterval(interval)
      // lockDetectionSuscription.remove()
    }
  }, [])
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Icon name="cross" family="entypo" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})
