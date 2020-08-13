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
        tokenResponse: json,
        receivedAt: Date.now(),
        isLoggedIn: true
    }
}

//TODO: add receiveUserError function to dispatch

export function getUser(username, password) {
    return async function (dispatch) {
        dispatch(requestUser(username))

        var res = await fetch('http://localhost:5000/auth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        var resJson = await res.json()

        if (res.ok) {
            dispatch(receiveUser(username, resJson))
        }
        else {
            throw new Error(resJson) //TODO: change to receiverUserError function
        }
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

export function createUser(firstName, lastName, email, username, password) {
    return async function (dispatch) {
        dispatch(requestCreateUser(firstName, lastName, email, username, password))

        return await fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            })
        })
        .then(response => {
            if(response.ok) {
                dispatch(receiveCreatedUser(username, response.json()))
            }
        })
    }
}