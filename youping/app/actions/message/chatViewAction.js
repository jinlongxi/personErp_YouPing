/**
 * Created by jinlongxi on 18/2/6.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求顾客信息
export function requestConsumerInfo(realPartyId, productId) {
    return {
        type: TYPES.REQUEST_CONSUMER_INFO,
        realPartyId,
        productId
    };
}

//发起网络请求顾客信息
export function fetchConsumerInfo() {
    return {
        type: TYPES.FETCH_CONSUMER_INFO
    };
}

//接受顾客信息
export function receiveConsumerInfo(consumerInfo) {
    return {
        type: TYPES.RECEIVE_CONSUMER_INFO,
        consumerInfo
    };
}

//清空客户数据
export function clearConsumerInfo() {
    return {
        type: TYPES.CLEAR_CONSUMER_INFO,
    };
}

//清楚消息角标
export function cleanSessionMessage(partyIdTo) {
    return {
        type: TYPES.CLEAN_MESSAGE_SESSION,
        partyIdTo
    };
}
