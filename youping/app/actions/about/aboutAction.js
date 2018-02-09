/**
 * Created by jinlongxi on 17/11/2.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求我的信息数据
export function requstAccountInfo() {
    return {
        type: TYPES.REQUEST_ACCOUNT_INFO,
    };
}
//网络请求我的信息数据
export function fetchAccountInfo() {
    return {
        type: TYPES.FETCH_ACCOUNT_INFO,
    };
}

//接收我的信息数据
export function receiveAccountInfo(accountInfo) {
    return {
        type: TYPES.RECEIVE_ACCOUNT_INFO,
        accountInfo
    };
}

