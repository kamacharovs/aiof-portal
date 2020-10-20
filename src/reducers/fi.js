import {
    FI_PAGE_LOADED,
    FI_PAGE_UNLOADED,
    ASYNC_START,
    FI_TIME_TO_FI,
    FI_COMPOUND_INTEREST,
    FI_ADDED_TIME,
    FI_BMI_IMPERIAL,
    FI_BMI_METRIC,
    FI_TIME_TO_FI_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FI_PAGE_LOADED:
            return {
                ...state,
                inProgress: false
            }
        case FI_PAGE_UNLOADED:
            return {}
        case ASYNC_START:
            if (action.subtype === FI_TIME_TO_FI
                || action.subtype === FI_ADDED_TIME
                || action.subtype === FI_COMPOUND_INTEREST
                || action.subtype === FI_BMI_IMPERIAL
                || action.subtype === FI_BMI_METRIC) {
                return { ...state, inProgress: true };
            }
            else {
                return { ...state }
            }
        case FI_TIME_TO_FI:
            return {
                ...state,
                inProgress: false,
                time: action.payload
            }
        case FI_COMPOUND_INTEREST:
            return {
                ...state,
                inProgress: false,
                compoundInterest: action.payload
            }
        case FI_ADDED_TIME:
            return {
                ...state,
                inProgress: false,
                addedTime: action.payload
            }
        case FI_BMI_IMPERIAL:
            return {
                ...state,
                inProgress: false,
                bmiImperial: {
                    bmi: action.payload,
                    weight: action.bmiPayload.weight,
                    feet: action.bmiPayload.feet,
                    inches: action.bmiPayload.inches
                }
            }
        case FI_BMI_METRIC:
            return {
                ...state,
                inProgress: false,
                bmiMetric: {
                    bmi: action.payload,
                    weight: action.bmiPayload.weight,
                    height: action.bmiPayload.height
                }
            }
        case FI_TIME_TO_FI_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
}