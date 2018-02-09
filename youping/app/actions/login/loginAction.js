'use strict';
import * as TYPES from '../../constants/ActionTypes';

//微信登录
export function requstWeChatLogin(code) {
    return {
        type: TYPES.REQUEST_WECHAT_LOGIN,
        code
    };
}
//网络请求微信登录
export function fetchWeChatLogin() {
    return {
        type: TYPES.FETCH_WECHAT_LOGIN,
    };
}

//微信登录成功
export function weChatLoginSuccess(token) {
    return {
        type: TYPES.WECHAT_LOGIN_SUCCESS,
        token
    };
}

//退出登录
export function weChatLoginOut() {
    return {
        type: TYPES.WECHAT_LOGIN_OUT
    };
}







