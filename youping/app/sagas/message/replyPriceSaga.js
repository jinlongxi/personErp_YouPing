/**
 * Created by jinlongxi on 18/2/8.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request, upLoadImage} from '../../utils/RequestUtil';
import {replyRequestPriceSuccess} from '../../actions/message/replyPriceAction';
import ServiceURl from '../../utils/service';

function* requestReplyPrice(productId, replyPrice, replyContent, typeArray, qrCode, custRequestId, custPartyId) {
    try {
        console.log(productId, replyPrice, replyContent, typeArray, qrCode, custRequestId, custPartyId);
        // const url = ServiceURl.personManager + 'returnFormAndCreateQuoteFromCustRequest';
        // const data = yield call(upLoadImage, url, 'post', formData);
        // console.log(data);
        //yield put(replyRequestPriceSuccess());
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听顾客信息请求
export function* watchReplyPrice() {
    while (true) {
        const {productId, replyPrice, replyContent, typeArray, qrCode, custRequestId, custPartyId}=yield take(types.REPLY_REQUEST_PRICE);
        yield fork(requestReplyPrice, productId, replyPrice, replyContent, typeArray, qrCode, custRequestId, custPartyId);
    }
}




