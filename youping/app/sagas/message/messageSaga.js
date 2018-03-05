/**
 * Created by jinlongxi on 18/2/6.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import ToastUtil from '../../utils/ToastUtil';
import {
    requestMessageList,
    fetchMessageList,
    receiveMessageList,
    receivePartyRequestsList
} from '../../actions/message/messageAction';
import ServiceURl from '../../utils/service';

function* requestMessageTypeList() {
    try {
        yield put(fetchMessageList());
        const url = ServiceURl.platformManager + 'loadAllMessage?bizType=' + 'webChat';
        const messageList = yield call(request, url, 'post');
        yield put(receiveMessageList(messageList.messages));
    } catch (error) {
        //yield put(receiveMessageList([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//请求
function* requestPartyRequestsList() {
    try {
        const url = ServiceURl.personManager + 'queryPartyRequests';
        const {requestList} = yield call(request, url, 'post');
        yield put(receivePartyRequestsList(requestList));
    } catch (error) {
        //yield put(receiveMessageList([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听消息列表请求
export function* watchRequestMessageList() {
    while (true) {
        const {requestType} = yield take(types.REQUEST_MESSAGE_LIST);
        if (requestType) {
            yield fork(requestMessageTypeList);
        } else {
            //yield fork(requestPartyRequestsList);
        }
    }
}

//清除消息
function* cleanMessageSession(partyIdTo) {
    try {
        const url = ServiceURl.platformManager + 'cleanSessionMessage?partyIdTo=' + partyIdTo;
        const {code} = yield call(request, url, 'post');
        if (code === '200') yield put(requestMessageList());//重新请求消息列表
    } catch (error) {
        //yield put(receiveMessageList([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听清除消息角标
export function* watchCleanMessageSession() {
    while (true) {
        const {partyIdTo}=yield take(types.CLEAN_MESSAGE_SESSION);
        yield fork(cleanMessageSession, partyIdTo);
    }
}
