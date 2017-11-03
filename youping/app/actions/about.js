/**
 * Created by jinlongxi on 17/11/2.
 */
import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';

//请求我的信息数据
export function fetchMyInfo() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_ABOUTINFO_DOING});

        const url = ServiceURl.personManager + 'queryPersonInfo';
        Request.postRequest(url, '', function (response) {
            console.log("我的信息详情" + JSON.stringify(response));
            let {code:code, userInfo:userInfo}=response;
            if (code === '200') {
                dispatch({
                    type: TYPES.FETCH_ABOUTINFO_SUCCESS,
                    myInfo: userInfo,
                });
            }
        }, function (err) {
            dispatch({type: TYPES.FETCH_ABOUTINFO_ERROR});
            console.log(JSON.stringify(err))
        });
    };
}

