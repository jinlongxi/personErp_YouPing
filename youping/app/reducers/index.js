import {combineReducers} from 'redux';
import loginReducer from './login';
import resourceReducer from './resource';
import aboutReducer from './about'

export default combineReducers({
    loginStore: loginReducer,
    resourceStore: resourceReducer,
    aboutStore: aboutReducer
});
