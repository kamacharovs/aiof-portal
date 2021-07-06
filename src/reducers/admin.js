import {
    ASYNC_START,
    ADMIN_CLEAR,
    ADMIN_USER,
    ADMIN_USER_REFRESH_TOKENS,
    ADMIN_CLIENT,
    ADMIN_CLIENT_DISABLE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CLEAR: {
            return {}
        }
        case ASYNC_START:
            if (action.subtype === ADMIN_USER) {
                return { ...state, inProgressUser: true }
            } else if (action.subtype === ADMIN_USER_REFRESH_TOKENS) {
                return { ...state, inProgressUserRefreshTokens: true }
            } else if (action.subtype === ADMIN_CLIENT) {
                return { ...state, inProgressClient: true }
            } else if (action.subtype === ADMIN_CLIENT_DISABLE) {
                return { ...state, inProgressClientDisable: true }
            } else {
                return {
                    ...state
                }
            }
        case ADMIN_USER:
            return {
                ...state,
                inProgressUser: false,
                user: action.error ? null : action.payload,
            }
        case ADMIN_USER_REFRESH_TOKENS:
            return {
                ...state,
                inProgressUserRefreshTokens: false,
                refreshTokens: action.error ? null : action.payload,
            }
        default:
            return state;
    }
};