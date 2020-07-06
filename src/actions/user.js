import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from './actionTypes';

export function getUser(username) {
    return function (dispatch) {
        dispatch({
            type: GET_USER,
        });

        fetch("http://localhost:5000/aiof/user/username/" + username)
            .then(response => response.json())
            .then(data => dispatch({
                type: GET_USER_SUCCESS,
                payload: data
            }))
            .catch(error => dispatch({
                type: GET_USER_FAILED,
                payload: error
            })
            );
    }
}