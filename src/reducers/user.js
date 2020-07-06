import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/actionTypes';

const initialState = { user: {}, status:"" };

export default function(state = initialState, action) {
    console.log("here 10")
  switch (action.type) {
    case GET_USER:
        console.log("here 4")
        state = Object.assign({}, state, {status: "waiting"});
        break;
    case GET_USER_SUCCESS:
        console.log("here 5")
        state = Object.assign({}, state, {user: action.payload, status: "received"});
        break;
    case GET_USER_FAILED:
        state = Object.assign({}, state, {status: "failed", error: action.payload});
        break;
    default:
        console.log("here 6")
        state = Object.assign({})
        break;
  }
  
  return state;
}