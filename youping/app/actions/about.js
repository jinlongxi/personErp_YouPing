/**
 * Created by jinlongxi on 17/11/2.
 */
import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';
import DeviceStorage from '../utils/deviceStorage';

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

//上传支付方法图片
export function uploadPaymentMethods(image, partyContentType) {
    return (dispatch) => {
        dispatch({type: TYPES.UPLOAD_PAYMENTMETHODS_DOING});
        DeviceStorage.get('tarjeta').then((tags) => {
                let url = ServiceURl.personManager + 'updatePersonPaymentQrCode?tarjeta=' + tags + '&partyContentType=' + partyContentType;
                let data = [];
                data.push(image);
                Request.uploadImage(url, data, function (response) {
                    console.log('上传支付图片:' + JSON.stringify(response));
                    const {code:code}=response;
                    if (code === '200') {
                        dispatch({type: TYPES.UPLOAD_PAYMENTMETHODS_SUCCESS,image:image,partyContentType:partyContentType});
                        //刷新个人数据
                        dispatch(fetchMyInfo())
                    }
                }, function (err) {
                    dispatch({type: TYPES.UPLOAD_PAYMENTMETHODS_ERROR});
                    console.log(JSON.stringify(err));
                });
        });
    };
}