import { GET_USER, GET_USER_SUCCESS, CREATE_USER, CREATE_USER_SUCCESS } from './actionTypes';
import fetch from 'cross-fetch'

function requestUser(username) {
    return {
        type: GET_USER,
        username,
        isLoggedIn: false
    }
}

function receiveUser(username, json) {
    return {
        type: GET_USER_SUCCESS,
        username,
        user: json,
        receivedAt: Date.now(),
        isLoggedIn: true
    }
}

export function getUser(username) {
    return function (dispatch) {
        dispatch(requestUser(username))

        return fetch("http://localhost:5000/aiof/user/username/" + username, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(
                response => response.json()
            )
            .then(json => {
                dispatch(receiveUser(username, json))
            })
    }
}


function requestCreateUser(firstName, lastName, email, username) {
    return {
        type: CREATE_USER,
        firstName,
        lastName,
        email,
        username,
        isCreated: false
    }
}

function receiveCreatedUser(username, json) {
    return {
        type: CREATE_USER_SUCCESS,
        username,
        user: json,
        receivedAt: Date.now(),
        isCreated: true
    }
}

export function createUser(firstName, lastName, email, username) {
    return function (dispatch) {
        dispatch(requestCreateUser(firstName, lastName, email, username))

        return fetch('http://localhost:5000/aiof/user/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username
            })
        })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveCreatedUser(username, json))
            })
    }
}