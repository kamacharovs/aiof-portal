import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from './actionTypes';

export function getUser(username) {
    console.log("here 2")
    return function (dispatch) {
        console.log("here 3")
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