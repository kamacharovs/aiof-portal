import {
    ASYNC_START,
    HOUSE_MORTGAGE_CALCULATOR
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      if (action.subtype === HOUSE_MORTGAGE_CALCULATOR) {
        return {
          ...state,
          inProgress: true
        }
      }
      return {
        ...state
      }
    case HOUSE_MORTGAGE_CALCULATOR:
      return {
        ...state,
        inProgress: false,
        mortgageCalculatorData: action.error ? null : action.payload.data,
        mortgageCalculatorBreakdown: action.error ? null : action.payload.breakdown,
      }
    default:
      return state
  }
}