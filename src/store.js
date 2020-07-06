import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers';
import { getUser } from './actions/user';

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk, 
        loggerMiddleware
    )
);

store.dispatch(getUser('gkama')).then(() => console.log(store.getState()))

export default store