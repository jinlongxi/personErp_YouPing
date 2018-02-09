/**
 * Created by jinlongxi on 18/2/7.
 */
import * as TYPES from '../../constants/ActionTypes';

//设置回复价格
export function setReplyPrice(price) {
    return {
        type: TYPES.SET_REPLY_PRICE,
        price
    };
}

//设置回复备注内容
export function setReplyContent(text) {
    return {
        type: TYPES.SET_REPLY_CONTENT,
        text
    };
}

//设置买家需填的表单
export function setCustomerInput(typeArray) {
    return {
        type: TYPES.SET_CUSTOMER_INPUT,
        typeArray
    };
}

//设置收款二维码
export function setQrCode(qrCode) {
    return {
        type: TYPES.SET_QR_CODE,
        qrCode
    };
}

//回复询价请求
export function replyRequestPrice(productId, replyPrice, replyContent, typeArray, qrCode,custRequestId,custPartyId) {
    return {
        type: TYPES.REPLY_REQUEST_PRICE,
        productId,
        replyPrice,
        replyContent,
        typeArray,
        qrCode,
        custRequestId,
        custPartyId
    };
}

//回复询价请求成功
export function replyRequestPriceSuccess() {
    return {
        type: TYPES.REPLY_REQUEST_PRICE_SUCCESS,
    };
}
