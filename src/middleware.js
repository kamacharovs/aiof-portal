import agent from './agent';
import { useCookies } from 'react-cookie';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);  //TODO : add logic if the error is unauthorized and the refresh_token is not null then call agent.Auth.refresh
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.acess_token); //TODO: move refresh token or token to HttpOnly Cookie
      window.localStorage.setItem('refreshToken', action.payload.refresh_token);
      agent.setToken(action.payload.acess_token);
      agent.setRefreshToken(action.payload.refresh_token);

      const setCookie = useCookies(['acess_token', 'refresh_token']);
      setCookie('acess_token', action.payload.acess_token, { path: '/' });
      setCookie('refresh_token', action.payload.refresh_token, { path: '/' });
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    window.localStorage.setItem('refreshToken', '');
    agent.setToken(null);
    agent.setRefreshToken(null);

    const removeCookie = useCookies(['acess_token', 'refresh_token']);
    removeCookie('acess_token')
    removeCookie('refresh_token')
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
