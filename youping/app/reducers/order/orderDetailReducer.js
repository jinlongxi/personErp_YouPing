/**
 * Created by jinlongxi on 18/2/28.
 */
import * as TYPES from '../../constants/ActionTypes';

const initialState = {
    orderDetailData: null,
    loading: false,
    status: null,
};

export default function orderDetail(state = initialState, action) {
    switch (action.type) {
        //请求订单列表
        case TYPES.FETCH_ORDER_DETAIL:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };
        //接收订单列表数据
        case TYPES.RECEIVE_ORDER_DETAIL:
            return {
                ...state,
                loading: false,
                orderDetailData: action.orderDetailData,
                status: 'done',
            };
        //清除订单详情数据
        case TYPES.CLEAR_ORDER_DETAIL:
            return {
                orderDetailData: null,
                status: 'clear',
            };
        default:
            return state;
    }
}