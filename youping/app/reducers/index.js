import {combineReducers} from 'redux';
import loginReducer from './login';
import resourceReducer from './resource';

export default combineReducers({
    loginStore: loginReducer,
    resourceStore: resourceReducer
});
