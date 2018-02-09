import {combineReducers} from 'redux';
import loginReducer from './login/loginReducer';
import resourceReducer from './resource';
import aboutReducer from './about/aboutReducer';
import orderReducer from './order';
import tabReducer from './tabs/tabReducer';
import resourceDetailReducer from './resource/resourceDetailReducer';
import resourceListReducer from './resource/resourceListReducer';
import resourceReleaseReducer from './resource/resourceReleaseReducer';
import messageReducer from './message/messageReducer';
import replyPriceReducer from './message/replyPriceReducer';

export default combineReducers({
    loginStore: loginReducer,
    resourceStore: resourceReducer,
    orderStore: orderReducer,
    aboutStore: aboutReducer,
    tabStore: tabReducer,
    resourceListStore: resourceListReducer,
    resourceDetailStore: resourceDetailReducer,
    messageStore: messageReducer,
    replyPriceStore: replyPriceReducer,
    resourceReleaseStore: resourceReleaseReducer
});
