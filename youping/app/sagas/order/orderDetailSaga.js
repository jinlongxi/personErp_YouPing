/**
 * Created by jinlongxi on 18/2/28.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import ToastUtil from '../../utils/ToastUtil';
import {
    fetchOrderDetail,
    receiveOrderDetail,
} from '../../actions/order/orderDetailAction';
import ServiceURl from '../../utils/service';

function* requestOrderDetail(orderId) {
    try {
        yield put(fetchOrderDetail(orderId));
        const url = ServiceURl.personManager + 'queryMyOrdersDetail?orderId=' + orderId;
        const {code, orderInfo} = yield call(request, url, 'post');
        if (code === '200') {
            yield put(receiveOrderDetail(orderInfo))
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听请求资源列表
export function* watchRequestOrderDetail() {
    while (true) {
        const {orderId}= yield take(types.REQUEST_ORDER_DETAIL);
        yield fork(requestOrderDetail, orderId);
    }
}





