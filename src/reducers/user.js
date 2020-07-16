import { 
    GET_USER, 
    GET_USER_SUCCESS, 
    GET_USER_FAILED, 
    CREATE_USER, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAILED } from '../actions/actionTypes';

const initialState = { username: "", user: {}, status: "" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case CREATE_USER:
        return {
            ...state,
            status: "waiting",
          };
    case GET_USER_SUCCESS:
        return {
            ...state,
            username: action.username,
            user: action.user,
            isLoggedIn: action.isLoggedIn
          };
    case GET_USER_FAILED:
    case CREATE_USER_FAILED:
        return {
            ...state,
            status: "failed",
            error: action.payload
        }
    case CREATE_USER_SUCCESS:
        return {
            ...state,
            username: action.username,
            user: action.user,
            isCreated: action.isCreated
        };
    default:
        return state;
  }
}