/**
 * Created by jinlongxi on 18/2/9.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求资源列表
export function requestResourceList() {
    return {
        type: TYPES.REQUEST_RESOURCE_LIST,
    };
}

//发起网络请求资源列表
export function fetchResourceList() {
    return {
        type: TYPES.FETCH_RESOURCE_LIST,
    };
}

//接受资源列表数据
export function receiveResourceList(resourceListData) {
    return {
        type: TYPES.RECEIVE_RESOURCE_LIST,
        resourceListData
    };
}

//下拉刷新资源列表数据
export function refreshResourceList() {
    return {
        type: TYPES.REFRESH_RESOURCE_LIST,
    };
}

//发起网络请求下架资源
export function fetchSalesDiscontinuation(productId) {
    return {
        type: TYPES.FETCH_SALES_DISCONTINUATION,
        productId
    };
}

//下架资源成功
export function fetchSalesDiscontinuationSuccess(productId) {
    return {
        type: TYPES.FETCH_SALES_DISCONTINUATION_SUCCESS,
        productId
    };
}

