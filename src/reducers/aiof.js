import { combineReducers } from 'redux'
import { getFinanceAsync } from '../actions/finance';

const initialState = {
    id: 1,
    finance: []
}

async function financeAsync(state = initialState, id) {
    return Object.assign({}, state, {
        finance: await getFinanceAsync(id)
    })
}

const aiofApp = combineReducers({
    financeAsync
})

export default aiofApp