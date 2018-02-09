'use strict';

import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import rootReducer from '../reducers/index';
//调试日志
const logger = store => next => action => {
    if (typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

//配置saga中间键
const sagaMiddleware = createSagaMiddleware();

let middlewares = [
    thunk,
    logger,
    sagaMiddleware
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducer);
    // install saga run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}


