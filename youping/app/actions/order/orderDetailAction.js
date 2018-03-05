/**
 * Created by jinlongxi on 18/2/28.
 */
/**
 * Created by jinlongxi on 18/2/28.
 */
import * as TYPES from '../../constants/ActionTypes';
import Request from '../../utils/request';
import ServiceURl from '../../utils/service';
import {requestOrderList} from './orderListAction';

//请求订单详情
export function requestOrderDetail(orderId) {
    return {
        type: TYPES.REQUEST_ORDER_DETAIL,
        orderId
    };
}

//发起网络请求订单详情
export function fetchOrderDetail(orderId) {
    return {
        type: TYPES.FETCH_ORDER_DETAIL,
        orderId
    };
}

//接收订单详情数据
export function receiveOrderDetail(orderDetailData) {
    return {
        type: TYPES.RECEIVE_ORDER_DETAIL,
        orderDetailData
    };
}

//清除订单详情数据
export function clearOrderDetail() {
    return {
        type: TYPES.CLEAR_ORDER_DETAIL
    }
}


//确定已收款
export function fetchPaymentReceived(orderId) {
    return (dispatch) => {
        const url = ServiceURl.personManager + 'orderPaymentReceived?orderId=' + orderId;
        Request.postRequest(url, '', function (response) {
            console.log('确认已收款' + JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                dispatch(requestOrderDetail(orderId));
                dispatch(requestOrderList("ALL"))
            } else {
                alert('收款失败！！')
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//确定发货
export function fetchDelivery(code, orderId, name, carrierCode, expressCode) {
    console.log(code, orderId, name, carrierCode, expressCode);
    return (dispatch) => {
        const url = ServiceURl.platformManager + 'updateShipGroupShipInfoForWeChat?code=' + code + '&orderId=' + orderId +
            '&name=' + name + '&carrierCode=' + carrierCode;
        Request.postRequest(url, '', function (response) {
            console.log('确定发货' + JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                dispatch(requestOrderDetail(orderId));
                dispatch(requestOrderList("ALL"))
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
            if (code === '200' && name !== '没有物流信息') {
                dispatch(fetchDelivery(codeNumber, orderId, name, carrierCode, expressCode))
            } else {
                alert(name)
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

