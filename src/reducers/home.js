import { 
  HOME_PAGE_LOADED,
  SNAPSHOT_SETTING_UPDATE } 
from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state
      };
    case SNAPSHOT_SETTING_UPDATE:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.field]: action.value
        }
      }
    default:
      return state;
  }
};
