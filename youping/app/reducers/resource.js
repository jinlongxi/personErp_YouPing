'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    resourceList: [],
    isEmpty: null,
    productCategoryId: null,
    status: null,
    isLoading: false,
};

export default function resource(state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCH_RESOURCE_LIST_DOING:
            return {
                ...state,
                resourceList:[],
                status: 'doing'
            };
        case TYPES.FETCH_RESOURCE_LIST_SUCCESS:
            return Object.assign({}, state, {
                resourceList: action.resourceList,
                productCategoryId: action.productCategoryId,
                isLoading: true,
                status: 'done'
            });
        case TYPES.FETCH_RESOURCE_LIST_ERROR:
            return {
                ...state,

                status: 'error'
            };
        case TYPES.RELEASE_RESOURCE_DOING:
            return {
                ...state,
                status: 'doing'
            };
        case TYPES.RELEASE_RESOURCE_SUCCESS:
            return {
                ...state,
                isEmpty: false,
                status: 'done'
            };
        case TYPES.RELEASE_RESOURCE_ERROR:
            return {
                ...state,
                status: 'error'
            };
        default:
            return state;
    }
}
