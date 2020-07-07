import { GET_USER, GET_USER_SUCCESS } from './actionTypes';
import fetch from 'cross-fetch'

function requestUser(username) {
  return {
    type: GET_USER,
    username
  }
}

function receiveUser(username, json) {
  return {
    type: GET_USER_SUCCESS,
    username,
    user: json,
    receivedAt: Date.now()
  }
}

export function getUser(username) {
    return function (dispatch) {

    dispatch(requestUser(username))

    return fetch("http://localhost:5000/aiof/user/username/" + username, {
        headers : { 
          'Accept': 'application/json'
         }
        })
      .then(
        response => response.json()
      )
      .then(json =>
        dispatch(receiveUser(username, json))
      )
  }
}