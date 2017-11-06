'use strict';

import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';
import DeviceInfo from 'react-native-device-info';
import DeciveStorage from '../utils/deviceStorage';

//微信登录
export function weChatLogin(code) {
    return (dispatch) => {
        dispatch({'type': TYPES.WECHAT_LOGIN_DOING});

        //准备参数
        const uuid = DeviceInfo.getUniqueID() + '/' + new Date().getTime();
        const url = ServiceURl.platformManager + 'weChatAppLogin';
        let formData = new FormData();
        formData.append("code", code);
        formData.append("uuid", uuid);

        //发送请求，获取TOKEN
        Request.postRequestLogin(url, formData, function (response) {
            console.log(JSON.stringify(response));
            let {code:code, tarjeta:tarjeta}=response;
            if (code === '200') {
                //保存tarjeta到本地
                DeciveStorage.save('tarjeta', tarjeta);
                dispatch({'type': TYPES.WECHAT_LOGIN_SUCCESS, tarjeta: tarjeta});
            } else {
                alert('登录失败')
            }
        }, function (err) {
            console.log(JSON.stringify(err));
            dispatch({'type': TYPES.WECHAT_LOGIN_ERROR, error: err});
        });
    };
}

//本地有TOKEN
export function hasToken(tarjeta) {
    return {
        type: TYPES.HAS_TOKEN,
        tarjeta: tarjeta
    }
}

//本地没有TOKEN
export function noToken() {
    return {
        type: TYPES.NO_TOKEN,
    }
}

//异地登录踢掉删除TOKEN
export function deleteToken(){
    return {
        type:TYPES.DELETE_TOKEN
    }
}




