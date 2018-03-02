/**
 * Created by jinlongxi on 18/2/28.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import ToastUtil from '../../utils/ToastUtil';
import {
    fetchOrderList,
    receiveOrderList,
} from '../../actions/order/orderListAction';
import ServiceURl from '../../utils/service';

function* requestOrderList(orderStatus) {
    try {
        yield put(fetchOrderList(orderStatus));
        const url = ServiceURl.personManager + 'queryMyResourceOrder?orderStatus=' + orderStatus;
        const {code, queryMyResourceOrderList} = yield call(request, url, 'post');
        if (code === '200') {
            yield put(receiveOrderList(queryMyResourceOrderList))
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听请求资源列表
export function* watchRequestOrderList() {
    while (true) {
        const {orderStatus}= yield take(types.REQUEST_ORDER_LIST);
        yield fork(requestOrderList, orderStatus);
    }
}





