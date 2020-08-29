import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
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
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
