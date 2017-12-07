'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    messageList: [],
    isLoading: false,
    status: null,
    chatData: [],
    orderData:[],
    partyId: null,
    isRefreshBack: false,//当返回时是否刷新页面
    clientData: [],
    partyRelation:''
};

export default function message(state = initialState, action) {
    switch (action.type) {
        //请求消息列表
        case TYPES.FETCH_MESSAGE_LIST_DOING:
            return {
                ...state,
                isLoading: false,
                messageList: [],
                status: 'doing'
            };
        case TYPES.FETCH_MESSAGE_LIST_SUCCESS:
            return Object.assign({}, state, {
                messageList: action.messageList,
                isLoading: true,
                status: 'done'
            });
        case TYPES.FETCH_MESSAGE_LIST_ERROR:
            return {
                ...state,
                status: 'error'
            };
        //获取单聊数据
        case TYPES.FETCH_SINGLE_MESSAGE_DOING:
            return Object.assign({}, state, {
                status: 'doing'
            });
        case TYPES.FETCH_SINGLE_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                chatData: action.textList,
                partyId: action.partyId,
                status: 'done'
            });
        case TYPES.FETCH_SINGLE_MESSAGE_ERROR:
            return {
                ...state,
                status: 'error'
            };
        //请求客户信息
        case TYPES.FETCH_CLIENT_LIST_SUCCESS:
            return {
                ...state,
                clientData: action.queryConsumerInfoList,
                orderData:action.orderList,
                partyRelation:action.partyRelation
            };
        default:
            return state;
    }
}
