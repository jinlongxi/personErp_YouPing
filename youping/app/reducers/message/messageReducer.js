'use strict';

import * as types from '../../constants/ActionTypes';

const initialState = {
    //消息列表状态
    loading: false,
    messageList: [],
    switchType: true,
    requestsPriceList: [],
    //聊天页面状态
    consumerInfo: null
};

export default function message(state = initialState, action) {
    switch (action.type) {
        //消息列表
        case types.FETCH_MESSAGE_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEIVE_MESSAGE_LIST:
            return Object.assign({}, state, {
                loading: false,
                messageList: action.messageList
            });
        case types.SWITCH_LIST_TYPE:
            return Object.assign({}, state, {
                switchType: !state.switchType
            });
        case types.RECEIVE_REQUEST_PRICE_LIST:
            return Object.assign({}, state, {
                requestsPriceList: action.requestsPriceList
            });
        //接受客户信息数据
        case types.FETCH_CONSUMER_INFO:
            return Object.assign({}, state, {
                consumerInfo: null
            });
        case types.RECEIVE_CONSUMER_INFO:
            return Object.assign({}, state, {
                consumerInfo: action.consumerInfo
            });
        case types.CLEAR_CONSUMER_INFO:
            return Object.assign({}, state, {
                consumerInfo: null
            });
        default:
            return state;
    }
}
