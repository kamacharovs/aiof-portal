import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/actionTypes';

const initialState = { user: {}, status:"" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
        return {
            ...state,
            status: "waiting",
          };
    case GET_USER_SUCCESS:
        return {
            ...state,
            user: {
              ...state.user
            },
            username: {
                ...state.username
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