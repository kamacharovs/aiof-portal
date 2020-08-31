import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import finance from './reducers/finance';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  editor,
  finance,
  home,
  profile,
  settings,
  router: routerReducer
});
