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
        profile: action.payload[0].profile,
        assets: action.payload[0].assets,
        liabilities: action.payload[0].liabilities,
        goals: action.payload[0].goals,
        subscriptions: action.payload[0].subscriptions,
        
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
