'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    hasToken: false,
    isLoggedIn: false,
    tarjeta: null,
    status: null,
    isLoading: true,
};

export default function login(state = initialState, action) {
    switch (action.type) {
        //微信登录
        case TYPES.WECHAT_LOGIN_DOING:
            return {
                ...state,
                isLoading: true,
                status: 'doing'
            };

        case TYPES.WECHAT_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                tarjeta: action.tarjeta,
                hasToken: true,
                status: 'done'
            };
        case TYPES.WECHAT_LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                status: 'error'
            };
        //判断是否有token
        case TYPES.HAS_TOKEN:
            return Object.assign({}, state, {
                hasToken: true,
                isLoggedIn: true,
                isLoading: false,
                tarjeta: action.tarjeta,
                status: 'done'
            });
        case TYPES.NO_TOKEN:
            return Object.assign({}, state, {
                hasToken: true,
                isLoggedIn: false,
                tarjeta: action.tarjeta,
                status: 'done'
            });
        case TYPES.DELETE_TOKEN:
            return Object.assign({}, state, {
                hasToken: true,
                isLoggedIn: false,
                isLoading: true,
                tarjeta: null,
                status: 'delete'
            });
        default:
            return state;
    }
}
