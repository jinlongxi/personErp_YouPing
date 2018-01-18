'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    myInfo: {},
    status: null,
    isLoading: null,
    aliPayImage: null,
    weChatPay: null,
};

export default function about(state = initialState, action) {
    switch (action.type) {
        //请求about数据
        case TYPES.FETCH_ABOUTINFO_DOING:
            return {
                ...state,
                myInfo: {},
                status: 'doing'
            };
        case TYPES.FETCH_ABOUTINFO_SUCCESS:
            return Object.assign({}, state, {
                myInfo: action.myInfo,
                isLoading: true,
                aliPayImage: action.myInfo.aliPayQrCode,
                weChatPay: action.myInfo.weChatQrCode,
                status: 'done'
            });
        case TYPES.FETCH_ABOUTINFO_ERROR:
            return {
                ...state,
                status: 'error'
            };
        //上传支付宝或微信收款二维码
        case TYPES.UPLOAD_PAYMENTMETHODS_DOING:
            return {
                ...state,
                isLoading: false,
                status: 'doing'
            };
        case TYPES.UPLOAD_PAYMENTMETHODS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: true,
                aliPayImage: action.partyContentType === 'ALIQRCODE' ? action.image : state.aliPayImage,
                weChatPay: action.partyContentType !== 'ALIQRCODE' ? action.image : state.weChatPay,
                status: 'success',
            });
        case TYPES.UPLOAD_PAYMENTMETHODS_ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return state;
    }
}
