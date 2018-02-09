/**
 * Created by jinlongxi on 18/2/6.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
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
        yield put(receiveMessageList([]));
    }
}

function* requestPartyRequestsList() {
    try {
        const url = ServiceURl.personManager + 'queryPartyRequests';
        const {requestList} = yield call(request, url, 'post');
        yield put(receivePartyRequestsList(requestList));
    } catch (error) {
        //yield put(receiveMessageList([]));
    }
}

//监听消息列表请求
export function* watchRequestMessageList() {
    while (true) {
        yield take(types.REQUEST_MESSAGE_LIST);
        yield fork(requestMessageTypeList);
        yield take(types.SWITCH_LIST_TYPE);
        yield fork(requestPartyRequestsList);
    }
}

function* cleanMessageSession(partyIdTo) {
    try {
        const url = ServiceURl.platformManager + 'cleanSessionMessage?partyIdTo=' + partyIdTo;
        const {code} = yield call(request, url, 'post');
        if (code === '200') yield put(requestMessageList());//重新请求消息列表
    } catch (error) {
        //yield put(receiveMessageList([]));
    }
}

//监听清除消息角标
export function* watchCleanMessageSession() {
    while (true) {
        const {partyIdTo}=yield take(types.CLEAN_MESSAGE_SESSION);
        yield fork(cleanMessageSession, partyIdTo);
    }
}
