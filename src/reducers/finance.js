import {
  ASYNC_START,
  FINANCE,
  FINANCE_PAGE_LOADED,
  FINANCE_PAGE_UNLOADED,
  ASSETS,
  ASSET_TYPES,
  ASSET_ADD,
  ASSET_UPDATE,
  ASSET_DELETE,
  ASSET_BREAKDOWN,
  LIABILITIES,
  LIABILITY_ADD,
  LIABILITY_TYPES,
  GOALS,
  GOAL_TYPES,
  GOAL_TRIP_TYPES,
  GOAL_COLLEGE_TYPES,
  GOAL_ADD,
  GOAL_DELETE,
  ANALYTICS_ANALYZE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FINANCE:
        return {
          ...state,
          inProgress: false,
          profile: action.payload.profile,
          assetsBase: action.payload.assets,
          liabilities: action.payload.liabilities,
          goalsBase: action.payload.goals,
          subscriptions: action.payload.subscriptions,
          dependents: action.payload.dependents,
        }
    case FINANCE_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        profile: action.payload.profile,
        assetsBase: action.payload.assets,
        liabilities: action.payload.liabilities,
        goalsBase: action.payload.goals,
        subscriptions: action.payload.subscriptions,
      }
    case FINANCE_PAGE_UNLOADED:
      return {}
    case ASSET_BREAKDOWN:
      return {
        ...state,
        inProgress: false,
        assetBreakdown: action.payload
      }
    case ASYNC_START:
      if (action.subtype === ASSET_BREAKDOWN
        || action.subtype === FINANCE
        || action.subtype === FINANCE_PAGE_LOADED
        || action.subtype === LIABILITY_ADD) {
        return { 
          ...state,
          inProgress: true
        }
      } else if (action.subtype === ASSETS) { return { ...state, inProgressAssets: true, }
      } else if (action.subtype === ASSET_TYPES) { return { ...state, inProgressAssetTypes: true, }
      } else if (action.subtype === ASSET_ADD) { return { ...state, inProgressAddAsset: true, }
      } else if (action.subtype === ASSET_UPDATE) { return { ...state, inProgressUpdateAsset: true, }
      } else if (action.subtype === ASSET_DELETE) { return { ...state, inProgressDeleteAsset: true, }
      } else if (action.subtype === LIABILITIES) { return { ...state, inProgressLiabilities: true, }
      } else if (action.subtype === GOALS) { return { ...state, inProgressGoals: true, }
      } else if (action.subtype === GOAL_TYPES) { return { ...state, inProgressGoalTypes: true, }
      } else if (action.subtype === GOAL_TRIP_TYPES) { return { ...state, inProgressGoalTripTypes: true, }
      } else if (action.subtype === GOAL_COLLEGE_TYPES) { return { ...state, inProgressGoalCollegeTypes: true }
      } else if (action.subtype === GOAL_ADD) { return { ...state, inProgressAddGoal: true, }
      } else if (action.subtype === GOAL_DELETE) { return { ...state, inProgressDeleteGoal: true, }
      } else if (action.subtype === ANALYTICS_ANALYZE) { return { ...state, inProgressAnalyticsAnalyze: true }}
      else {
        return { 
          ...state 
        }
      }
    case LIABILITY_ADD:
      return {
        ...state,
        inProgress: false,
      }
    case LIABILITY_TYPES:
      return {
        ...state,
        liabilityTypes: action.error ? null : action.payload
      }
    case ASSETS:
      return {
        ...state,
        inProgressAssets: false,
        inProgressDeleteAsset: false,
        assets: action.error ? null : action.payload,
        assetDeleted: false,
        assetAddedCode: null,
        assetUpdatedCode: null,
      }
    case ASSET_TYPES:
      return {
        ...state,
        inProgressAssetTypes: false,
        assetTypes: action.error ? null : action.payload,
      }
    case ASSET_ADD:
      return {
        ...state,
        inProgressAddAsset: false,
        assetAdded: action.error ? null : action.payload,
        assetAddedCode: action.error ? action.payload.code : 200,
      }
    case ASSET_UPDATE:
      return {
        ...state,
        inProgressUpdateAsset: false,
        assetUpdated: action.error ? null : action.payload,
        assetUpdatedCode: action.error ? action.payload.code : 200,
      }
    case ASSET_DELETE:
      return {
        ...state,
        inProgressDeleteAsset: false,
        assetDeleted: action.error ? null : true,
      }
    case LIABILITIES:
      return {
        ...state,
        inProgressLiabilities: false,
        liabilities: action.error ? null : action.payload,
      }
    case GOALS:
      return {
        ...state,
        inProgressGoals: false,
        goals: action.error ? null : action.payload,
        goalDeleted: false,
        goalAddedCode: null,
      }
    case GOAL_TRIP_TYPES:
      return {
        ...state,
        inProgressGoalTripTypes: false,
        goalTripTypes: action.error ? null : action.payload,
      }
    case GOAL_COLLEGE_TYPES:
      return {
        ...state,
        inProgressGoalCollegeTypes: false,
        goalCollegeTypes: action.error ? null : action.payload,
      }
    case GOAL_ADD:
      return {
        ...state,
        inProgressAddGoal: false,
        goalAdded: action.error ? null : action.payload,
        goalAddedCode: action.error ? action.payload.code : 200,
      }
    case GOAL_DELETE:
      return {
        ...state,
        inProgressDeleteGoal: false,
        goalDeleted: action.error ? null : true,
      }
    case ANALYTICS_ANALYZE:
      return {
        ...state,
        inProgressAnalyticsAnalyze: false,
        analyze: action.error ? null : action.payload
      }
    default:
      return state;
  }
};
