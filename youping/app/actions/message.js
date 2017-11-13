import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';

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
export function fetchMessageOne(partyIdFrom, click) {
    console.log('不是推送来的吗：'+click);
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_SINGLE_MESSAGE_DOING});
        const url = ServiceURl.platformManager + 'loadAllMessage?bizType=findOne&click=' + click;
        const data = '&partyIdFrom=' + partyIdFrom;
        Request.postRequest(url, data, function (response) {
            //console.log('我的一对一聊天记录' + JSON.stringify(response));
            const {code:code, messages:messages, partyId:partyId}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_SINGLE_MESSAGE_SUCCESS,
                    textList: messages,
                    partyId: partyId
                })
            }
        }, function (err) {
            console.log(JSON.stringify(err));
            dispatch({type: TYPES.FETCH_SINGLE_MESSAGE_ERROR})
        });
    };
}

//发送一对一消息
export function sendMessageOne(text, partyIdTo, objectId) {
    console.log('发送消息所需要的参数' + text + partyIdTo + objectId);
    return (dispatch) => {
        const url = ServiceURl.WebManagerNew + 'pushMessage';
        const data = '&text=' + text + '&partyIdTo=' + partyIdTo + '&objectId=' + objectId;
        Request.postRequest(url, data, function (response) {
            console.log('发送消息' + JSON.stringify(response));
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
}
