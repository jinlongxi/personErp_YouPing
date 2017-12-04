'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    orderList: [],
    orderDetail: [],
    isLoading: false,
    status: null,
};

export default function order(state = initialState, action) {
    switch (action.type) {

        case TYPES.FETCH_ORDER_LIST_DOING:
            return {
                ...state,
                status: 'doing'
            };
        //请求订单列表
        case TYPES.FETCH_ORDER_LIST_SUCCESS:
            return {
                ...state,
                orderList: action.orderList,
                isLoading: true,
                status: 'done'
            };
        //请求订单详情
        case TYPES.FETCH_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                orderDetail: [...state.orderDetail, action.orderDetail],
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
