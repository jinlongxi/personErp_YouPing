'use strict';

import * as TYPES from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    isLoggedIn: false,
    tarjeta: null,
    status: null,
    booting: true,//开始画面
};

export default function login(state = initialState, action) {
    switch (action.type) {
        //微信登录
        case TYPES.FETCH_WECHAT_LOGIN:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };

        case TYPES.WECHAT_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                tarjeta: action.tarjeta,
                booting: false,
                status: 'success'
            };
        case TYPES.WECHAT_LOGIN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                tarjeta: null,
                booting: false,
                status: 'delete'
            };
        default:
            return state;
    }
}
