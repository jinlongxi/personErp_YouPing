'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    isLoggedIn: false,
    tarjeta: null,
    status: null,
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
                status: 'done'
            };
        case TYPES.WECHAT_LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                status: 'error'
            };
        case TYPES.UPDATE_TOKEN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                tarjeta: action.tarjeta,
                status: 'done'
            });
        default:
            return state;
    }
}
