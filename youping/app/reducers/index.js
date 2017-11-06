import {combineReducers} from 'redux';
import loginReducer from './login';
import resourceReducer from './resource';
import aboutReducer from './about';
import orderReducer from './order';
import messageReducer from './message';

export default combineReducers({
    loginStore: loginReducer,
    resourceStore: resourceReducer,
    orderStore: orderReducer,
    aboutStore: aboutReducer,
    messageStore: messageReducer,
});