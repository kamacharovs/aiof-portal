import {
    ASYNC_START,
    RETIREMENT_PAGE_LOADED,
    RETIREMENT_PAGE_UNLOADED,
    RETIREMENT_COMMON_INVESTMENTS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case RETIREMENT_PAGE_LOADED:
            return {
                ...state,
                inProgress: false,
            }
        case RETIREMENT_PAGE_UNLOADED:
            return {
                ...state,
                inProgress: false,
            }
        case ASYNC_START:
            if (action.subtype === RETIREMENT_COMMON_INVESTMENTS) {
                return {
                    ...state,
                    inProgress: true
                }
            }
            else {
                return {
                    ...state
                }
            }
        case RETIREMENT_COMMON_INVESTMENTS: {
            return {
                ...state,
                inProgress: false,
            }
        }
    }
}