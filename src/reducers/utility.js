import {
    ASYNC_START,
    UTILITY_USEFUL_DOCUMENTATION_BY_PAGE,
    UTILITY_USEFUL_DOCUMENTATION_BY_CATEGORY
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      if (action.subtype === UTILITY_USEFUL_DOCUMENTATION_BY_PAGE
        || action.subtype === UTILITY_USEFUL_DOCUMENTATION_BY_CATEGORY) {
        return {
          ...state,
          inProgress: true
        }
      }
      return {
        ...state
      }
    case UTILITY_USEFUL_DOCUMENTATION_BY_PAGE:
    case UTILITY_USEFUL_DOCUMENTATION_BY_CATEGORY:
      return {
        ...state,
        inProgress: false,
        usefulDocumentations: action.error ? null : action.payload
      }
    default:
      return state
  }
}