import {
  ASYNC_START,
  FINANCE_PAGE_LOADED,
  FINANCE_PAGE_UNLOADED,
  ASSET_BREAKDOWN,
  ASSET_ADD,
  LIABILITY_ADD,
  LIABILITY_TYPES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FINANCE_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        profile: action.payload.profile,
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        goals: action.payload.goals,
        subscriptions: action.payload.subscriptions,
      };
    case FINANCE_PAGE_UNLOADED:
      return {};
    case ASSET_BREAKDOWN:
      return {
        ...state,
        inProgress: false,
        assetBreakdown: action.payload
      };
    case ASYNC_START:
      if (action.subtype === ASSET_BREAKDOWN) {
        return { ...state, inProgress: true };
      }
      else {
        return { ...state }
      }
    case ASSET_ADD:
      return {
        ...state,
        asset: action.error ? null : action.payload.asset,
      };
    case LIABILITY_TYPES:
      return {
        ...state,
        liabilityTypes: action.error ? null : action.payload
      };
    case LIABILITY_ADD:
      return {
        ...state,
        liability: action.error ? null : action.payload
      };
    default:
      return state;
  }
};
