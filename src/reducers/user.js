import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/actionTypes';

const initialState = { username: "", user: {}, status: "" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
        return {
            ...state,
            status: "waiting",
          };
    case GET_USER_SUCCESS:
        console.log("checking action: " + action.payload)
        return {
            ...state,
            username: {
                ...state.username
            },
            user: {
                ...state.user
            },
            isLoggedIn: {
                ...state.isLoggedIn
            }
          };
    case GET_USER_FAILED:
        return {
            ...state,
            status: "failed",
            error: action.payload
        }
    default:
        return state;
  }
}