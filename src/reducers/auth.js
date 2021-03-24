import {
  REGISTER,
  LOGIN,
  LOGIN_GET_USER,
  REFRESH,
  PASSWORD_RESET,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      if (action.subtype === LOGIN) { return { ...state, inProgressLogin: true }
      } else if (action.subtype === REGISTER) { return { ...state, inProgressRegister: true }
      } else if (action.subtype === REFRESH) { return { ...state, inProgressRefresh: true }
      } else if (action.subtype === LOGIN_GET_USER) { return { ...state, inProgressGetUser: true }
      } else if (action.subtype === PASSWORD_RESET) { return { ...state, inProgressPasswordReset: true } 
      } else {
        return { 
          ...state 
        }
      }
    case LOGIN:
      return {
        ...state,
        inProgressLogin: false,
        loginError: action.error ? action.payload : null,
      }
    case REGISTER:
      return {
        ...state,
        inProgressRegister: false,
        registerError: action.error ? action.payload : null,
      }
    case REFRESH:
      return {
        ...state,
        inProgressRefresh: false,
        refreshError: action.error ? action.payload : null,
      }
    case LOGIN_GET_USER:
      return {
        ...state,
        inProgressGetUser: false,
        getUerError: action.error ? action.payload : null,
      }
    case PASSWORD_RESET:
      return {
        ...state,
        inProgressPasswordReset: false,
        passwordResetError: action.error ? action.payload : null,
      }
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {}
    default:
      return state;
  }
};