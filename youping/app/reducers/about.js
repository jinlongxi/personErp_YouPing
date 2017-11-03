'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    myInfo: {},
    status: null,
    isLoading: null,
};

export default function about(state = initialState, action) {
    switch (action.type) {
        //请求about数据
        case TYPES.FETCH_ABOUTINFO_DOING:
            return {
                ...state,
                myInfo:{},
                status: 'doing'
            };
        case TYPES.FETCH_ABOUTINFO_SUCCESS:
            return Object.assign({}, state, {
                myInfo: action.myInfo,
                isLoading: true,
                status: 'done'
            });
        case TYPES.FETCH_ABOUTINFO_ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return state;
    }
}
