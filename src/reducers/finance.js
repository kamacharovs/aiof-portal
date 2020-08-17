import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  USER_FINANCE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case USER_FINANCE:
      return {
        ...state,
        pager: action.pager,
        assets: action.payload.assets,
        goals: action.payload.goals,
        liabilities: action.payload.liabilities
      };
    default:
      return state;
  }
};
