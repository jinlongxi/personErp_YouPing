/**
 * Created by jinlongxi on 18/2/9.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import DeviceStorage from '../../utils/deviceStorage';
import {
    fetchResourceList,
    receiveResourceList,
    fetchSalesDiscontinuationSuccess
} from '../../actions/resource/resourceListAction';
import ServiceURl from '../../utils/service';

function* requestResourceList() {
    try {
        yield put(fetchResourceList());
        const url = ServiceURl.personManager + 'queryMyResource';
        const {code, myResourceList, productCategoryId} = yield call(request, url, 'post');
        DeviceStorage.save('productCategoryId', productCategoryId);
        if (code === '200') yield put(receiveResourceList(myResourceList));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听请求资源列表
export function* watchRequestResourceList() {
    while (true) {
        yield take(types.REQUEST_RESOURCE_LIST);
        yield fork(requestResourceList);
    }
}

function* requestSalesDiscontinuation(productId) {
    try {
        const url = ServiceURl.personManager + 'salesDiscontinuation?productId=' + productId;
        const {code} = yield call(request, url, 'post');
        if (code === '200') yield put(fetchSalesDiscontinuationSuccess(productId));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听请求下架资源
export function* watchRequestSalesDiscontinuation() {
    while (true) {
        const {productId}=yield take(types.FETCH_SALES_DISCONTINUATION);
        yield fork(requestSalesDiscontinuation, productId);
    }
}




