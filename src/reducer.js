import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import fi from './reducers/fi';
import finance from './reducers/finance';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  fi,
  finance,
  home,
  profile,
  settings,
  router: routerReducer
});
