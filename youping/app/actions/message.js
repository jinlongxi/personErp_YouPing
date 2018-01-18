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
            //console.log('我的消息列表' + JSON.stringify(response));
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
export function fetchMessageOne(partyIdFrom, click, productId) {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_SINGLE_MESSAGE_DOING});
        const url = ServiceURl.platformManager + 'loadAllMessage?bizType=findOne&click=' + click;
        const data = '&partyIdFrom=' + partyIdFrom + '&productId=' + productId;
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
export function queryConsumerInfo(realPartyId, productId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'queryConsumerInfo?realPartyId=' + realPartyId + '&productId=' + productId;
        Request.postRequest(url, '', function (response) {
            console.log('获取客户信息' + JSON.stringify(response));
            const {code:code, resourceDetail:resourceDetail, partyRelation:partyRelation, distributingLeaflets:distributingLeaflets}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_CLIENT_LIST_SUCCESS,
                    queryConsumerInfoList: resourceDetail,
                    partyRelation: partyRelation,
                    distributingLeaflets: distributingLeaflets,
                });
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}

//清楚消息角标
export function cleanSessionMessage(partyIdTo) {
    return (dispatch) => {
        let url = ServiceURl.platformManager + 'cleanSessionMessage?partyIdTo=' + partyIdTo;
        Request.postRequest(url, '', function (response) {
            //console.log('清楚角标：',JSON.stringify(response));
            const {code:code}=response;
            if (code === '200') {
                setTimeout(function () {
                    dispatch(fetchMessageList())
                }, 2000)
            }
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}



