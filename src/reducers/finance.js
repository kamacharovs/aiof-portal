import {
  ASYNC_START,
  FINANCE_PAGE_LOADED,
  FINANCE_PAGE_UNLOADED,
  ASSET_BREAKDOWN,
  ASSET_ADD,
  ASSET_TYPES,
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
    case FINANCE_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        profile: action.payload.profile,
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        goals: action.payload.goals,
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
        || action.subtype === FINANCE_PAGE_LOADED
        || action.subtype === ASSET_ADD
        || action.subtype === LIABILITY_ADD
        || action.subtype === ANALYTICS_ANALYZE) {
        return { 
          ...state,
          inProgress: true
        }
      } else if (action.subtype === GOALS) { return { ...state, inProgressGoals: true, }
      } else if (action.subtype === GOAL_TYPES) { return { ...state, inProgressGoalTypes: true, }
      } else if (action.subtype === GOAL_TRIP_TYPES) { return { ...state, inProgressGoalTripTypes: true, }
      } else if (action.subType === GOAL_COLLEGE_TYPES) { return { ...state, inProgressGoalCollegeTypes: true }
      } else if (action.subtype === GOAL_ADD) { return { ...state, inProgressAddGoal: true, }
      } else if (action.subType === GOAL_DELETE) { return { ...state, inProgressDeleteGoal: true, }}
      else {
        return { 
          ...state 
        }
      }
    case ASSET_ADD:
      return {
        ...state,
        inProgress: false,
      }
    case ASSET_TYPES:
      return {
        ...state,
        assetTypes: action.error ? null : action.payload
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
        inProgress: false,
        analyze: action.error ? null : action.payload
      }
    default:
      return state;
  }
};
