import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';

//请求订单列表数据
export function fetchOrderList() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_ORDER_LIST_DOING});
        const url = ServiceURl.personManager + 'queryMyResourceOrder';
        Request.postRequest(url, '', function (response) {
            console.log('我的订单' + JSON.stringify(response));
            let {code:code, queryMyResourceOrderList:orderList}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_ORDER_LIST_SUCCESS,
                    orderList: orderList,
                });
            }
        }, function (err) {
            dispatch({type: TYPES.FETCH_ORDER_LIST_ERROR});
            console.log(JSON.stringify(err));
        });
    };
}
