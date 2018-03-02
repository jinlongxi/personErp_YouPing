/**
 * Created by jinlongxi on 18/2/8.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request} from '../../utils/RequestUtil';
import {fetchWeChatLogin, weChatLoginSuccess, weChatLoginOut} from '../../actions/login/loginAction';
import ServiceURl from '../../utils/service';
import DeviceStorage from '../../utils/deviceStorage';
import ToastUtil from '../../utils/ToastUtil';

function* requestLogin(code) {
    try {
        yield put(fetchWeChatLogin());
        const url = ServiceURl.platformManager + 'weChatAppLogin?code=' + code;
        const responseData = yield call(request, url, 'post');
        if (responseData.code === '200') {
            DeviceStorage.save('tarjeta', responseData.tarjeta);
            DeviceStorage.save('partyId', responseData.partyId);
            yield put(weChatLoginSuccess(responseData.tarjeta));
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听顾客信息请求
export function* watchRequestLogin() {
    while (true) {
        const {code}=yield take(types.REQUEST_WECHAT_LOGIN);
        yield fork(requestLogin, code);
        // yield take(types.WECHAT_LOGIN_OUT);
        // yield call(DeviceStorage.delete, 'tarjeta')
    }
}




