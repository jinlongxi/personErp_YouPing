import {combineReducers} from 'redux';
import loginReducer from './login/loginReducer';
import aboutReducer from './about/aboutReducer';
import tabReducer from './tabs/tabReducer';
import resourceDetailReducer from './resource/resourceDetailReducer';
import resourceListReducer from './resource/resourceListReducer';
import resourceReleaseReducer from './resource/resourceReleaseReducer';
import messageReducer from './message/messageReducer';
import replyPriceReducer from './message/replyPriceReducer';
import orderListReducer from './order/orderListReducer';
import orderDetailReducer from './order/orderDetailReducer';

export default combineReducers({
    loginStore: loginReducer,
    aboutStore: aboutReducer,
    tabStore: tabReducer,
    resourceListStore: resourceListReducer,
    resourceDetailStore: resourceDetailReducer,
    messageStore: messageReducer,
    replyPriceStore: replyPriceReducer,
    resourceReleaseStore: resourceReleaseReducer,
    orderListStore: orderListReducer,
    orderDetailStore: orderDetailReducer
});
