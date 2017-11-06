'use strict';

import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
//调试日志
const logger = store => next => action => {
    if (typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

let middlewares = [
    thunk,
    logger
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducer);
    store.close = () => store.dispatch(END);
    return store;
}


