'use strict';

import * as types from '../../constants/ActionTypes';

const initialState = {
    //消息列表状态
    loading: false,
    messageList: [],
    switchType: true,
    requestsPriceList: [
        {text:'沈寅麟提醒您发货'},
        {text:'您的资源有大量未处理订单，请尽快处理！'},
        {text:'订单10001处理失败'},
        {text:'有新的版本2.0，请更新'},
        {text:'您的资源10000，实际库存大于出货库存请调整库存数量！'},
    ],
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
