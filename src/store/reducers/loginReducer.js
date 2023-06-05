import { LoginActionType } from '../actions/actionTypes';
import { handleData } from '../middlewares';

const initialState = {
  loginData: {
    data: {},
    loading: false,
    error: null,
    temp: false,
  },
};

const LoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LoginActionType.LOGIN_USER: {
      return handleData(state, action, {
        request: (prevState) => ({
          ...prevState,
          loginData: { loading: true },
        }),
        success: (prevState) => ({
          ...prevState,
          loginData: {
            loading: false,
            data: payload,
            // error: null,
          },
        }),
        failure: (prevState) => ({
          ...prevState,
          loginData: { loading: false, data: payload },
        }),
      });
    }
    case LoginActionType.UPDATE_TEMP: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          temp: true,
        },
      };
    }
    case LoginActionType.CLEAR_REDUCER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default LoginReducer;
