/**
 * Created by jinlongxi on 18/2/6.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import {fetchResourceDetail, receiveResourceDetail} from '../../actions/resource/resourceDetailAction';
import ServiceURl from '../../utils/service';

function* requestResourceDetail(productId) {
    try {
        yield put(fetchResourceDetail());
        const url = ServiceURl.personManager + 'queryResourceDetail?productId=' + productId;
        const {code,resourceDetail} = yield call(request, url, 'post');
        if(code==='200') yield put(receiveResourceDetail(resourceDetail));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听顾客信息请求
export function* watchRequestResourceDetail() {
    while (true) {
        const {productId}=yield take(types.REQUEST_RESOURCE_DETAIL);
        yield fork(requestResourceDetail, productId);
    }
}




