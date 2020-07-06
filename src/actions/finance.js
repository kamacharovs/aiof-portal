export const AIOF_BASE_URL = 'http://localhost:5000/aiof/'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const getFinance = id => ({
  type: 'finance',
  payload: {
    financeId: id,
    finance: {}
  }
});