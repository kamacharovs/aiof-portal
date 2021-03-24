import {
  APP_LOAD,
  REDIRECT,
  REDIRECT_HOME,
  REDIRECT_LOGIN,
  LOGOUT,
  LOGIN,
  LOGIN_GET_USER,
  REGISTER,
  REFRESH,
  ARTICLE_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const defaultState = {
  appName: "Aiof",
  appFullName: "All in one finance",
  appDescription: "All in one finance",
  appShortAccountDescription: "One account for everything finance",
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? 
          {
            id: action.payload.id,
            publicKey: action.payload.publicKey,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            created: action.payload.created
          } : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case REDIRECT_HOME:
      return { ...state, redirectTo: '/' }
    case REDIRECT_LOGIN:
      return { ...state, redirectTo: '/login' }
    case LOGOUT:
      return { 
        ...state,
        redirectTo: '/login', 
        token: null, 
        currentUser: null,
        expiresIn: null,
      };
    case LOGIN:
      return {
        ...state,
        token: action.error ? null : action.payload.access_token,
        refreshToken: action.error ? null : action.payload.refresh_token
      };
    case LOGIN_GET_USER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload
      }
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/login',
        token: action.error ? null : action.payload.access_token,
        refreshToken: action.error ? null : action.payload.refresh_token,
        currentUser: action.error ? null : action.payload.user
      };
    case REFRESH:
      return {
        ...state,
        token: action.error ? null : action.payload.access_token,
        expiresIn: action.error ? null : action.payload.expires_in
      };
    case ARTICLE_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
