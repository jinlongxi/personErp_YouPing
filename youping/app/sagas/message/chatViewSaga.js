/**
 * Created by jinlongxi on 18/2/6.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import {fetchConsumerInfo, receiveConsumerInfo} from '../../actions/message/chatViewAction';
import ServiceURl from '../../utils/service';
import ToastUtil from '../../utils/ToastUtil';

function* requestConsumerInfo(realPartyId, productId) {
    try {
        yield put(fetchConsumerInfo());
        const url = ServiceURl.personManager + 'queryConsumerInfo?realPartyId=' + realPartyId + '&productId=' + productId;
        const consumerInfo = yield call(request, url, 'post');
        yield put(receiveConsumerInfo(consumerInfo));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听顾客信息请求
export function* watchRequestConsumerInfo() {
    while (true) {
        const {realPartyId, productId}=yield take(types.REQUEST_CONSUMER_INFO);
        yield fork(requestConsumerInfo, realPartyId, productId);
    }
}




