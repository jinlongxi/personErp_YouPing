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
        case TYPES.WECHAT_LOGIN_DOING:
            return {
                ...state,
                status: 'doing'
            };

        case TYPES.WECHAT_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
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
                isLoading: false,
                tarjeta: action.tarjeta,
                status: 'done'
            });
        case TYPES.DELETE_TOKEN:
            return Object.assign({}, state, {
                hasToken: true,
                isLoggedIn: false,
                isLoading: false,
                tarjeta: null,
                status: 'delete'
            });
        default:
            return state;
    }
}
