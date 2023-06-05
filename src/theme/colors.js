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
  button: 'yellow'
}
const useColors = () => {
  const theme = useColorScheme()
  return theme === 'light' ? { ...common, ...light } : { ...common, ...dark }
}

export { useColors }
