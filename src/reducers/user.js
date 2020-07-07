import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/actionTypes';

const initialState = { user: {}, status:"" };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
        state = Object.assign({}, state, {status: "waiting"});
        break;
    case GET_USER_SUCCESS:
        state = Object.assign({}, state, {user: action.payload, status: "received"});
        break;
    case GET_USER_FAILED:
        state = Object.assign({}, state, {status: "failed", error: action.payload});
        break;
    default:
        state = Object.assign({})
        break;
  }
  
  return state;
}