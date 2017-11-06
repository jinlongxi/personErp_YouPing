'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    messageList: [],
    isLoading: false,
    status: null,
};

export default function message(state = initialState, action) {
    switch (action.type) {
        //请求商品列表
        case TYPES.FETCH_MESSAGE_LIST_DOING:
            return {
                ...state,
                messageList: [],
                status: 'doing'
            };
        case TYPES.FETCH_MESSAGE_LIST_SUCCESS:
            return {
                messageList: action.messageList,
                isLoading: true,
                status: 'done'
            };
        case TYPES.FETCH_MESSAGE_LIST_ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return state;
    }
}
