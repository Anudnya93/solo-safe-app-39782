import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules
} from 'react-native'
import Icon from '../../components/Icon'

let lockDetectionSuscription

const Home = () => {
  const { LockDetection } = NativeModules

  console.log('rndetection', LockDetection)

  useEffect(() => {
    LockDetection.registerforDeviceLockNotif() // Register the library to listen the events for Darwin notifications
    const LockDetectionEmitter = new NativeEventEmitter(LockDetection) // Create instance of EventEmitter
    lockDetectionSuscription = LockDetectionEmitter.addListener(
      // and add the listener
      'LockStatusChange',
      newStatus => {
        console.log('new status', newStatus) // Do whatever you need with the information
      }
    )

    // android another implementation better working

    // const eventEmitter = new NativeEventEmitter(NativeModules.PhoneLocked)

    // eventEmitter.addListener('EventReminder', res => {
    //   // listen here for screen on or off action
    //   console.log(res.action) // ACTION_USER_PRESENT || ACTION_SCREEN_OFF || ACTION_SCREEN_ON
    // })

    // android implementation 2 end

    // android implementation working

    // const RNLockDetection = NativeModules.RNLockDetection
    // console.log('RNLockDetection', RNLockDetection)

    // interval = setInterval(() => {
    //   RNLockDetection.isLock().then(callback => {
    //     //calback = true is mode sleep
    //     if (callback) {
    //       console.log('Mode Sleep')
    //     } else {
    //       console.log('Active screen')
    //     }
    //   })
    // }, 1000)

    // android implementation end
    return () => {
      // clearInterval(interval)
      lockDetectionSuscription.remove()
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
