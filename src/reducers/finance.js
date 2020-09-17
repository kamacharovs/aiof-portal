import {
  FINANCE_PAGE_LOADED,
  FINANCE_PAGE_UNLOADED,
  ASSET_ADD,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FINANCE_PAGE_LOADED:
      return {
        ...state,
        profile: action.payload.profile,
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        goals: action.payload.goals,
        subscriptions: action.payload.subscriptions,
      };
    case FINANCE_PAGE_UNLOADED:
      return {};
    case ASSET_ADD:
      return {
        ...state,
        asset:  action.error ? null : action.payload.asset,
      }
    default:
      return state;
  }
};
