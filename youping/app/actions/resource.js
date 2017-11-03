/**
 * Created by jinlongxi on 17/11/2.
 */
import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';
import DeviceStorage from '../utils/deviceStorage'

//请求资源数据列表
export function fetchResourceList() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_RESOURCE_LIST_DOING});

        //发送请求，获取TOKEN
        const url = ServiceURl.personManager + 'queryMyResource';
        Request.postRequest(url, '', function (response) {
            let {code:code, productCategoryId:productCategoryId, myResourceList:myResourceList}=response;
            if (code === '200') {
                DeviceStorage.save('productCategoryId', productCategoryId);
                dispatch({
                    type: TYPES.FETCH_RESOURCE_LIST_SUCCESS,
                    resourceList: myResourceList,
                    productCategoryId: productCategoryId
                });
            }
        }, function (err) {
            dispatch({type: TYPES.FETCH_RESOURCE_LIST_ERROR});
            console.log(JSON.stringify(err))
        });
    };
}

//发布资源
export function releaceResource(picture, productName, productPrice) {
    return (dispatch) => {
        DeviceStorage.get('tarjeta').then((tags) => {
            DeviceStorage.get('productCategoryId').then((CategoryId)=> {
                let url = ServiceURl.personManager + 'releaseResource?tarjeta=' + tags + '&productName=' + productName +
                    '&productPrice=' + productPrice + '&productCategoryId=' + CategoryId;
                let data = [];
                data.push(picture);
                Request.uploadImage(url, data, function (response) {
                    console.log('发布资源' + JSON.stringify(response));
                    const {code:code}=response;
                    if (code === '200') {
                        dispatch({type: TYPES.RELEASE_RESOURCE_SUCCESS});
                        dispatch(fetchResourceList())
                    }
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
            });
        });

    };
}

//下架资源
export function salesDiscontinuation(productId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'salesDiscontinuation';
        let data = '&productId=' + productId;
        Request.postRequest(url, data, function (success) {
            console.log('下架商品' + success);
            let {code:code}=success;
            if (code === '200') {
                dispatch({type: TYPES.DELETE_RESOURCE_SUCCESS, productId: productId});
                //dispatch(fetchResourceList());
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    };
}

