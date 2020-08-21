import {
  PROFILE_PAGE_LOADED,
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
        goals: action.payload[0].goals
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    case UPDATE_FIELD_PROFILE:
        return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};
