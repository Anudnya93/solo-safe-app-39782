import { Dimensions, PixelRatio, Platform } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH]

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

const hScale = shortDimension / guidelineBaseWidth
const vScale = longDimension / guidelineBaseHeight

export function horizontalScale(val) {
  return Math.floor(hScale * val)
}

export function verticalScale(val) {
  return Math.floor(vScale * val)
}

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export function fontScale(size) {
  const newSize = hScale * size
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export function normalFontScale(size) {
  const newSize = hScale * size
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export { wp, hp }
