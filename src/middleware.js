import agent from './agent';
import Cookies from 'js-cookie';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGIN_GET_USER,
  LOGOUT,
  REGISTER,
  REFRESH
} from './constants/actionTypes';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
} from './constants/common';

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
        if (process.env.NODE_ENV !== 'production') {
          console.log('RESULT', res);
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        if (process.env.NODE_ENV !== 'production') {
          console.log('ERROR', error);
        }
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

const cookieMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      const expires = new Date(new Date().getTime() + action.payload.expires * 1000);

      Cookies.set(ACCESS_TOKEN, action.payload.access_token, { path: '/', expires: expires });
      Cookies.set(REFRESH_TOKEN, action.payload.refresh_token, { path: '/', expires: expires });
      
      agent.setToken(action.payload.access_token);
      agent.setRefreshToken(action.payload.refresh_token);
      agent.setExpires(expires);
    }
  } else if (action.type === LOGIN_GET_USER) {
    if (!action.error) {
      Cookies.set(USER, action.payload, { path: '/', expires: agent.expires });
    }
  } else if (action.type === REFRESH) {
    if (!action.error) {
      const expires = new Date(new Date().getTime() + action.payload.expires * 1000);

      Cookies.set(ACCESS_TOKEN, action.payload.access_token, { path: '/', expires: expires });
      Cookies.set(REFRESH_TOKEN, Cookies.get(REFRESH_TOKEN), { path: '/', expires: expires });
      Cookies.set(USER, Cookies.get(USER), { path: '/', expires: expires });

      agent.setToken(action.payload.access_token);
      agent.setExpires(expires);
    }
  } else if (action.type === LOGOUT) {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(USER);

    agent.setToken(null);
    agent.setRefreshToken(null);
    agent.setExpires(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, cookieMiddleware }
