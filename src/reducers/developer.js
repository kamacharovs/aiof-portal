import {
    ASYNC_START,
    DEVELOPER_AUTH_OPENAPI,
    DEVELOPER_API_OPENAPI,
    DEVELOPER_ASSET_OPENAPI,
    DEVELOPER_LIABILITY_OPENAPI,
    DEVELOPER_PAGE_UNLOADED,
} from '../constants/actionTypes';

const defaultState = {
    infos: [],
    servers: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === DEVELOPER_AUTH_OPENAPI
                || action.subtype === DEVELOPER_API_OPENAPI
                || action.subtype === DEVELOPER_ASSET_OPENAPI
                || action.subtype === DEVELOPER_LIABILITY_OPENAPI) {
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
        case DEVELOPER_API_OPENAPI:
        case DEVELOPER_ASSET_OPENAPI:
        case DEVELOPER_LIABILITY_OPENAPI:
            return {
                ...state,
                inProgress: false,
                infos: [...state.infos, action.payload.info],
                servers: [...state.servers, action.payload.servers],
            }
        case DEVELOPER_PAGE_UNLOADED:
            return defaultState;
        default:
            return state;
    }
};
