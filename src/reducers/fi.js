import {
    FI_TIME_TO_FI,
    FI_TIME_TO_FI_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FI_TIME_TO_FI:
            return {
                ...state,
                time: action.payload
            }
        case FI_TIME_TO_FI_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
}