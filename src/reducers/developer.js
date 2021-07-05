import {
    ASYNC_START,
    DEVELOPER_AUTH_OPENAPI,
    DEVELOPER_ASSET_OPENAPI,
} from '../constants/actionTypes';

const defaultState = {
    infos: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === DEVELOPER_AUTH_OPENAPI
                || action.subtype === DEVELOPER_ASSET_OPENAPI) {
                return {
                    ...state,
                    inProgress: true
                }
            } else {
                return {
                    ...state
                }
            }
        case DEVELOPER_AUTH_OPENAPI:
            return {
                ...state,
                inProgress: false,
                infos: [...state.infos, action.payload.info],
            }
        case DEVELOPER_ASSET_OPENAPI:
            return {
                ...state,
                inProgress: false,
                infos: [...state.infos, action.payload.info],
            }
        default:
            return state;
    }
};
