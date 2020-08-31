import {
  FINANCE_PAGE_LOADED,
  FINANCE_PAGE_UNLOADED,
  USER_FINANCE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FINANCE_PAGE_LOADED:
      return {
        ...state,
      };
    case FINANCE_PAGE_UNLOADED:
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
