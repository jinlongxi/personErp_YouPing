import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';

//请求消息列表数据
export function fetchMessageList() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_MESSAGE_LIST_DOING});
        const url = ServiceURl.platformManager + 'loadMessage';
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
