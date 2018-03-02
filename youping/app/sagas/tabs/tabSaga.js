/**
 * Created by jinlongxi on 18/2/8.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import {saveRegistrationId} from '../../actions/tab/tabAction';
import DeviceInfo from 'react-native-device-info';
import ServiceURl from '../../utils/service';
import ToastUtil from '../../utils/ToastUtil';

function* requestSaveRegistrationId(registrationId) {
    try {
        const deviceType = yield call(DeviceInfo.getUserAgent);
        const url = ServiceURl.platformManager + 'regJpushRegId?regId=' + registrationId + '&deviceType=' + deviceType;
        const responseData = yield call(request, url, 'post');
        yield put(saveRegistrationId(registrationId));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听顾客信息请求
export function* watchRequestSaveRegistrationId() {
    while (true) {
        const {registrationId}=yield take(types.REQUEST_SAVE_REGID);
        yield fork(requestSaveRegistrationId, registrationId);
    }
}




