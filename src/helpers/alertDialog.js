import { Alert } from 'react-native'

const alertDialog = ({ title = '', message, onPress }) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => onPress && onPress(),
        style: 'cancel'
      }
    ],
    {
      cancelable: false,
      onDismiss: () => {}
    }
  )

export default alertDialog
