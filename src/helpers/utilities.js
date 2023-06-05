import moment from 'moment'
import { Alert, Linking, Platform } from 'react-native'
import { useSelector } from 'react-redux'

export const formatPhoneNumber = value => {
  if (!value) {
    return value
  }
  const phoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = phoneNumber?.length
  if (phoneNumberLength < 4) {
    return phoneNumber
  }
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  }
  if (phoneNumberLength === 11) {
    return `${phoneNumber.slice(0, 1)}-${phoneNumber.slice(
      1,
      4
    )}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`
  }
  if (phoneNumberLength === 12) {
    return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(
      2,
      5
    )}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 12)}`
  }
}

export const useUserType = () => {
  const userMappings = {
    0: 'admin',
    1: 'gma',
    2: 'intervention'
  }
  const userType = useSelector(
    reducer => reducer.loginReducer?.loginData?.data?.user?.user_type
  )
  return userMappings[userType]
}
export const useUserId = () => {
  const userId = useSelector(
    reducer => reducer.loginReducer?.loginData?.data?.user?.id
  )
  return userId
}

export const greetings = () => {
  const time = moment().format('HH')
  return time < 12
    ? 'Good Morning!'
    : time >= 12 && time < 17
    ? 'Good Afternoon!'
    : 'Good Evening!'
}

export const handleCall = number => {
  let phoneNumber = number.replace(/[^a-zA-Z0-9]/g, '')
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phoneNumber}`
  } else {
    phoneNumber = `tel:${phoneNumber}`
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not valid')
      } else {
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(err => console.error(err))
}

export function toHHMMSS(secs) {
  const sec_num = parseInt(secs, 10)
  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor(sec_num / 60) % 60
  const seconds = sec_num % 60

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':')
}
