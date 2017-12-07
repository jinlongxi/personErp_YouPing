import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';
import DeviceStorage from '../utils/deviceStorage';

//请求消息列表数据
export function fetchMessageList() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_MESSAGE_LIST_DOING});
        const url = ServiceURl.platformManager + 'loadAllMessage?bizType=' + 'webChat';
        Request.postRequest(url, '', function (response) {
            console.log('我的消息列表' + JSON.stringify(response));
            let {code:code, messages:messageList}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_MESSAGE_LIST_SUCCESS,
                    messageList: messageList,
                });
            }
        }, function (err) {
            dispatch({type: TYPES.FETCH_MESSAGE_LIST_ERROR});
            console.log(JSON.stringify(err));
        });
    };
}
//请求一对一消息
export function fetchMessageOne(partyIdFrom, click,productId) {
    console.log(partyIdFrom, click,productId)
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_SINGLE_MESSAGE_DOING});
        const url = ServiceURl.platformManager + 'loadAllMessage?bizType=findOne&click=' + click;
        const data = '&partyIdFrom=' + partyIdFrom+'&productId='+productId;
        Request.postRequest(url, data, function (response) {
            console.log('我的一对一聊天记录' + JSON.stringify(response));
            const {code:code, messages:messages, partyId:partyId}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_SINGLE_MESSAGE_SUCCESS,
                    textList: messages,
                    partyId: partyId
                });
            }
        }, function (err) {
            console.log(JSON.stringify(err));
            dispatch({type: TYPES.FETCH_SINGLE_MESSAGE_ERROR})
        });
    };
}

//发送文本消息
export function sendMessageOne(message, partyIdTo, objectId, messageLogTypeId) {
    return (dispatch) => {
        const url = ServiceURl.WebManagerNew + 'pushMessage';
        let data;
        if (messageLogTypeId === 'TEXT') {
            data = '&text=' + message + '&partyIdTo=' + partyIdTo + '&objectId=' + objectId + '&messageLogTypeId=' + messageLogTypeId;
        } else if (messageLogTypeId === 'LOCATION') {
            data = '&text=' + JSON.stringify(message) + '&partyIdTo=' + partyIdTo + '&objectId=' + objectId + '&messageLogTypeId=' + messageLogTypeId;
        }
        Request.postRequest(url, data, function (response) {
            console.log('发送文本消息成功');
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//发送图片消息
export function sendImageMessage(images, partyIdTo, objectId, messageLogTypeId, pay_qr_code) {
    console.log(images, partyIdTo, objectId, messageLogTypeId, pay_qr_code);
    return (dispatch) => {
        DeviceStorage.get('tarjeta').then((tags) => {
            let url = ServiceURl.WebManagerNew + 'pushMessage?tarjeta=' + tags + '&partyIdTo=' + partyIdTo +
                '&objectId=' + objectId + '&messageLogTypeId=' + messageLogTypeId + '&pay_qr_code=' + pay_qr_code;
            Request.uploadImage(url, images, function (response) {
                console.log('发送图片消息成功' + JSON.stringify(response));
                const {code:code}=response;
                if (code === '200') {
                }
            }, function (err) {
                console.log(JSON.stringify(err));
            });
        });
    };
}

//获取客户信息
export function queryConsumerInfo(realPartyId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'queryConsumerInfo?realPartyId=' + realPartyId;
        Request.postRequest(url, '', function (response) {
            console.log('获取客户信息' + JSON.stringify(response));
            const {code:code,queryConsumerInfoList:queryConsumerInfoList,orderList:orderList,partyRelation:partyRelation}=response;
            if (code === '200') {
                dispatch({type: TYPES.FETCH_CLIENT_LIST_SUCCESS,queryConsumerInfoList:queryConsumerInfoList,orderList:orderList,partyRelation:partyRelation});
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//确定发货
export function fetchDelivery(code, orderId, name, carrierCode, expressCode) {
    console.log(code, orderId, name, carrierCode, expressCode);
    return (dispatch) => {
        const url = ServiceURl.platformManager + 'updateShipGroupShipInfoForWeChat?code=' + code + '&orderId=' + orderId +
            '&name=' + name + '&carrierCode=' + carrierCode;
        Request.postRequest(url, '', function (response) {
            console.log('确定发货' + JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                dispatch(fetchOrderList())
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}


//获取物流信息
export function fetchLogistics(codeNumber, orderId) {
    return (dispatch) => {
        const url = ServiceURl.platformManager + 'queryExpressInfo?code=' + codeNumber+'&orderId='+orderId;
        Request.postRequest(url, '', function (response) {
            console.log('获取物流信息' + JSON.stringify(response));
            const {code:code, name:name, carrierCode:carrierCode, expressCode:expressCode}=response;
            if (code === '200') {
                dispatch(fetchDelivery(codeNumber, orderId, name, carrierCode, expressCode))
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//确定已收款
export function fetchPaymentReceived(productId,realPartyId) {
    return (dispatch) => {
        const url = ServiceURl.personManager + 'confirmPayment?productId=' + productId+'&realPartyId='+realPartyId;
        Request.postRequest(url, '', function (response) {
            console.log('确认已收款' + JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                //dispatch(queryConsumerInfo(realPartyId))
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}


