'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    resourceList: [],
    isEmpty: null,
    productCategoryId: null,
    status: null,
    isLoading: false,
    isRefresh:false
};

export default function resource(state = initialState, action) {
    switch (action.type) {
        //请求商品列表
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
        //发布商品
        case TYPES.RELEASE_RESOURCE_SUCCESS:
            return {
                ...state,
                status: 'done'
            };
        //下架商品
        case TYPES.DELETE_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                resourceList: state.resourceList.filter((item)=>{
                    if(item.productId!==action.productId){
                        return item
                    }
                }),
                status: 'done'
            });
        default:
            return state;
    }
}
