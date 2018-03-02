/**
 * Created by jinlongxi on 18/2/8.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import {fetchAccountInfo, receiveAccountInfo} from '../../actions/about/aboutAction';
import ServiceURl from '../../utils/service';
import ToastUtil from '../../utils/ToastUtil';

function* requestAccountInfo() {
    try {
        yield put(fetchAccountInfo());
        const url = ServiceURl.personManager + 'queryPersonInfo';
        const responseData = yield call(request, url, 'post');
        if (responseData.code === '200') {
            yield put(receiveAccountInfo(responseData.userInfo));
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听顾客信息请求
export function* watchRequestAccountInfo() {
    while (true) {
        yield take(types.REQUEST_ACCOUNT_INFO);
        yield fork(requestAccountInfo);
    }
}




