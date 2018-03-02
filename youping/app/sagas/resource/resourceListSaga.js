/**
 * Created by jinlongxi on 18/2/9.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import DeviceStorage from '../../utils/deviceStorage';
import ToastUtil from '../../utils/ToastUtil';

import {
    fetchResourceList,
    receiveResourceList,
    fetchSalesDiscontinuationSuccess,
    requestResourceList
} from '../../actions/resource/resourceListAction';
import ServiceURl from '../../utils/service';

function* RequestResourceList() {
    try {
        yield put(fetchResourceList());
        const url = ServiceURl.personManager + 'queryMyResource';
        const {code, myResourceList, productCategoryId} = yield call(request, url, 'post');
        DeviceStorage.save('productCategoryId', productCategoryId);
        if (code === '200') yield put(receiveResourceList(myResourceList));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听请求资源列表
export function* watchRequestResourceList() {
    while (true) {
        yield take(types.REQUEST_RESOURCE_LIST);
        yield fork(RequestResourceList);
    }
}

function* requestSalesDiscontinuation(productId) {
    try {
        const url = ServiceURl.personManager + 'salesDiscontinuation?productId=' + productId;
        const {code} = yield call(request, url, 'post');
        if (code === '200') {
            yield put(requestResourceList());
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听请求下架资源
export function* watchRequestSalesDiscontinuation() {
    while (true) {
        const {productId}=yield take(types.FETCH_SALES_DISCONTINUATION);
        yield fork(requestSalesDiscontinuation, productId);
    }
}




