import {
    FI_TIME_TO_FI,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
      case FI_TIME_TO_FI:
        return {
            ...state
        }
    }
}