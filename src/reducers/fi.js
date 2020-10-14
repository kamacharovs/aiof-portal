import {
    FI_TIME_TO_FI,
    FI_COMPOUND_INTEREST,
    FI_ADDED_TIME,
    FI_BMI_IMPERIAL,
    FI_BMI_METRIC,
    FI_TIME_TO_FI_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case FI_TIME_TO_FI:
            return {
                ...state,
                time: action.payload
            }
        case FI_COMPOUND_INTEREST:
            return {
                ...state,
                compoundInterest: action.payload
            }
        case FI_ADDED_TIME:
            return {
                ...state,
                addedTime: action.payload
            }
        case FI_BMI_IMPERIAL:
            return {
                ...state,
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