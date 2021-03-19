import {
  ASYNC_START,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_GET_USER_PROFILE,
  PROFILE_UPSERT_USER_PROFILE,
  PROFILE_STEPPER_PAGE_LOADED,
  PROFILE_GET_OPTIONS,
  USER_DEPENDENTS,
  UPDATE_FIELD_PROFILE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
      };
    case PROFILE_GET_USER_PROFILE:
    case PROFILE_UPSERT_USER_PROFILE:
      return {
        ...state,
        inProgress: false,
        profile: action.error ? null : action.payload
      }
    case ASYNC_START:
      if (action.subtype === PROFILE_GET_USER_PROFILE
        || action.subtype === PROFILE_UPSERT_USER_PROFILE
        || action.subtype === PROFILE_GET_OPTIONS) {
        return { 
          ...state, 
          inProgress: true
        };
      } else if (action.subtype === USER_DEPENDENTS) return { ...state, inProgressDependents: true, }
      else {
        return { 
          ...state
        }
      }
    case PROFILE_STEPPER_PAGE_LOADED:
      return {
        ...state,
        assetTypes: action.payload[0],
        liabilityTypes: action.payload[1],
      }
    case PROFILE_GET_OPTIONS:
      return {
        ...state,
        inProgress: false,
        options: action.error ? null : action.payload
      }
    case PROFILE_PAGE_UNLOADED:
      return {};
    case UPDATE_FIELD_PROFILE:
      return { ...state, [action.key]: action.value };
    case USER_DEPENDENTS:
      return {
        ...state,
        dependents: action.error ? null : action.payload,
        inProgressDependents: false,
      }
    default:
      return state;
  }
};
