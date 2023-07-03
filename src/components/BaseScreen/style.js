import { Platform, StyleSheet } from 'react-native'
import { verticalScale, horizontalScale } from '../../helpers/basicStyles'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : verticalScale(40)
  },
  KeyboardAvoidingView: {
    flex: 1
  },
  KeyboardAvoidingViewContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 100
  },
  linearGradient: {
    flex: 1
  }
})
