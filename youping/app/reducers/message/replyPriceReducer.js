/**
 * Created by jinlongxi on 18/2/7.
 */
'use strict';

import * as types from '../../constants/ActionTypes';

const initialState = {
    replyPrice: null,
    replyContent: null,
    typeArray: null,
    qrCode: null,
    status: null
};

export default function replyPrice(state = initialState, action) {
    switch (action.type) {
        //设置回复价格
        case types.SET_REPLY_PRICE:
            return Object.assign({}, state, {
                replyPrice: action.price
            });
        //设置回复内容
        case types.SET_REPLY_CONTENT:
            return Object.assign({}, state, {
                replyContent: action.text
            });
        //设置买家需填表单类型
        case types.SET_CUSTOMER_INPUT:
            return Object.assign({}, state, {
                typeArray: action.typeArray
            });
        //设置收款二维码
        case types.SET_QR_CODE:
            return Object.assign({}, state, {
                qrCode: action.qrCode
            });
        //回复询价请求成功
        case types.REPLY_REQUEST_PRICE_SUCCESS:
            return Object.assign({}, state, {
                status: 'success'
            });
        default:
            return state;
    }
}
