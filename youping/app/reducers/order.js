'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    orderList: [],
    isLoading: false,
    status: null,
};

export default function order(state = initialState, action) {
    switch (action.type) {
        //请求商品列表
        case TYPES.FETCH_ORDER_LIST_DOING:
            return {
                ...state,
                orderList: [],
                status: 'doing'
            };
        case TYPES.FETCH_ORDER_LIST_SUCCESS:
            return {
                orderList: action.orderList,
                isLoading: true,
                status: 'done'
            };
        case TYPES.FETCH_RESOURCE_LIST_ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return state;
    }
}
