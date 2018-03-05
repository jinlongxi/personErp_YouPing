import * as TYPES from '../../constants/ActionTypes';

const initialState = {
    orderListData: [],
    loading: false,
    status: null,
    orderStatus: null,
};

export default function order(state = initialState, action) {
    switch (action.type) {
        //请求订单列表
        case TYPES.FETCH_ORDER_LIST:
            return {
                ...state,
                loading: true,
                orderStatus: action.orderStatus,
                status: 'doing'
            };
        //接受订单列表数据
        case TYPES.RECEIVE_ORDER_LIST:
            return {
                ...state,
                loading: false,
                orderListData: action.orderListData,
                status: 'done',
            };
        //设置订单列表显示类型
        case TYPES.SET_ORDER_STATUS:
            return {
                ...state,
                orderStatus: action.orderStatus,
            };
        default:
            return state;
    }
}