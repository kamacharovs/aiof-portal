import { 
  HOME_PAGE_LOADED,
  HOME_SNAPSHOT_SETTING_UPDATE,
  HOME_GETTING_STARTED_UPDATE } 
from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state
      };
    case HOME_SNAPSHOT_SETTING_UPDATE:
    case HOME_GETTING_STARTED_UPDATE:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.field]: action.value
        },
      }
    default:
      return state;
  }
};
