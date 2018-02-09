'use strict';

import * as TYPES from '../../constants/ActionTypes';

const initialState = {
    accountInfo: {},
    status: null,
    loading: false,
};

export default function about(state = initialState, action) {
    switch (action.type) {
        //请求about数据
        case TYPES.FETCH_ACCOUNT_INFO:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };
        case TYPES.RECEIVE_ACCOUNT_INFO:
            return Object.assign({}, state, {
                loading: false,
                accountInfo: action.accountInfo,
                status: 'done'
            });
        default:
            return state;
    }
}
