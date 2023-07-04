import { useColorScheme } from 'react-native'

const light = {
  primary: 'white',
  text: 'black'
}
const dark = {
  primary: 'black',
  text: 'white'
}

const common = {
  blueBorder: '#399CC5',
  gray: '#666666',
  red: '#EA4335',
  background: '#F6F6F6',
  purple: '#840078'
}
const useColors = () => {
  const theme = useColorScheme()
  return theme === 'light' ? { ...common, ...light } : { ...common, ...dark }
}

export { useColors }
