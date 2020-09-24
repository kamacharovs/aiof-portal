import {
  PROFILE_PAGE_LOADED,
  PROFILE_STEPPER_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  UPDATE_FIELD_PROFILE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        firstName: action.payload[0].firstName,
        lastName: action.payload[0].lastName,
        email: action.payload[0].email,
        username: action.payload[0].username,
        profile: action.payload[0].profile,
        assets: action.payload[0].assets,
        liabilities: action.payload[0].liabilities,
        goals: action.payload[0].goals,
        subscriptions: action.payload[0].subscriptions,
      };
    case PROFILE_STEPPER_PAGE_LOADED:
      return {
        ...state,
        assetTypes: action.payload[0],
        liabilityTypes: action.payload[1],
      }
    case PROFILE_PAGE_UNLOADED:
      return {};
    case UPDATE_FIELD_PROFILE:
        return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};
