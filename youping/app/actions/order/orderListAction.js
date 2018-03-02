/**
 * Created by jinlongxi on 18/2/28.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求订单列表
export function requestOrderList(orderStatus) {
    return {
        type: TYPES.REQUEST_ORDER_LIST,
        orderStatus
    };
}

//发起网络请求订单列表
export function fetchOrderList(orderStatus) {
    return {
        type: TYPES.FETCH_ORDER_LIST,
        orderStatus
    };
}

//接受订单列表数据
export function receiveOrderList(orderListData) {
    return {
        type: TYPES.RECEIVE_ORDER_LIST,
        orderListData
    };
}