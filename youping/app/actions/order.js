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
            //console.log('我的订单' + JSON.stringify(response));
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

//请求订单详情
// export function fetchOrdersDetail (orderId) {
//     return (dispatch) => {
//         dispatch({type: TYPES.FETCH_ORDER_LIST_DOING});
//         const url = ServiceURl.personManager + 'queryMyOrdersDetail?orderId='+orderId;
//         Request.postRequest(url, '', function (response) {
//             console.log('我的订单详情' + JSON.stringify(response));
//             const {orderInfo:orderInfo,code:code}=response;
//             if (code === '200') {
//                 dispatch({
//                     type: TYPES.FETCH_ORDER_DETAIL_SUCCESS,
//                     orderDetail: orderInfo,
//                 });
//             }
//         }, function (err) {
//             dispatch({type: TYPES.FETCH_ORDER_LIST_ERROR});
//             console.log(JSON.stringify(err));
//         });
//     };
// }

//确定发货
export function fetchDelivery(code, orderId, name, carrierCode, expressCode) {
    console.log(code, orderId, name, carrierCode, expressCode);
    return (dispatch) => {
        const url = ServiceURl.platformManager + 'updateShipGroupShipInfoForWeChat?code=' + code + '&orderId=' + orderId +
            '&name=' + name + '&carrierCode=' + carrierCode;
        Request.postRequest(url, '', function (response) {
            console.log('确定发货' + JSON.stringify(response));
            if (code === '200') {

            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}


//获取物流信息
export function fetchLogistics(codeNumber, orderId) {
    return (dispatch) => {
        const url = ServiceURl.platformManager + 'queryExpressInfo?code=' + codeNumber;
        Request.postRequest(url, '', function (response) {
            console.log('获取物流信息' + JSON.stringify(response));
            const {code:code, name:name, carrierCode:carrierCode, expressCode:expressCode}=response;
            if (code === '200') {
                dispatch(fetchDelivery(codeNumber, orderId, name, carrierCode, expressCode))
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//确定已收款
export function fetchPaymentReceived(orderId) {
    return (dispatch) => {
        const url = ServiceURl.personManager + 'orderPaymentReceived?orderId=' + orderId;
        Request.postRequest(url, '', function (response) {
            console.log('确认已收款' + JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                dispatch(fetchOrderList())
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

