import { Strings } from '../../constants/Strings'
import alertDialog from '../../helpers/alertDialog'
import { login, logout } from '../../network'
import { LoginActionType } from './actionTypes'

export class LoginActions {
  static login = payload => {
    return {
      isAsyncCall: true,
      baseType: LoginActionType.LOGIN_USER,
      payload,
      asyncCall: () => {
        return login(payload)
      }
    }
  }
  static update_temp = () => dispatch => {
    dispatch({ type: LoginActionType.UPDATE_TEMP })
  }
  static logout = () => {
    return {
      isAsyncCall: true,
      baseType: LoginActionType.LOGOUT,
      asyncCall: () => {
        return logout()
      },
      onSuccess: dispatch => {
        dispatch(LoginActions.clearReducer())
      },
      onFailure: () => {
        alertDialog({
          title: 'Error',
          onPress: () => {
            undefined
          },
          message: Strings.ErrorOccured
        })
      }
    }
  }
  static clearReducer = () => dispatch => {
    dispatch({ type: LoginActionType.CLEAR_REDUCER })
  }
}
