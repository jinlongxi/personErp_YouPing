/**
 * Created by jinlongxi on 17/11/2.
 */
import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';
import Request from '../utils/request';
import ServiceURl from '../utils/service';
import DeviceStorage from '../utils/deviceStorage';

//请求资源数据列表
export function fetchResourceList() {
    return (dispatch) => {
        dispatch({type: TYPES.FETCH_RESOURCE_LIST_DOING});

        //发送请求，获取TOKEN
        const url = ServiceURl.personManager + 'queryMyResource';
        Request.postRequest(url, '', function (response) {
            console.log('查询我的资源' + JSON.stringify(response));
            let {code:code, productCategoryId:productCategoryId, myResourceList:myResourceList}=response;
            if (code === '200') {
                DeviceStorage.save('productCategoryId', productCategoryId);
                dispatch({
                    type: TYPES.FETCH_RESOURCE_LIST_SUCCESS,
                    resourceList: myResourceList,
                    productCategoryId: productCategoryId,
                });
            }
        }, function (err) {
            dispatch({type: TYPES.FETCH_RESOURCE_LIST_ERROR});
            alert('我去，服务器挂了', JSON.stringify(err))
        });
    };
}

//发布资源
export function releaseResource(data, productName, description, productPrice, quantityTotal) {
    console.log(data, productName, description, productPrice, quantityTotal);
    return (dispatch) => {
        dispatch({type: TYPES.RELEASE_RESOURCE_DOING});
        DeviceStorage.get('tarjeta').then((tags) => {
            DeviceStorage.get('productCategoryId').then((CategoryId)=> {
                let url = ServiceURl.personManager + 'releaseResource?tarjeta=' + tags + '&productName=' + productName +
                    '&description=' + description + '&productCategoryId=' + CategoryId + '&quantityTotal=' + quantityTotal + '&productPrice=' + productPrice;
                Request.uploadImage(url, data, function (response) {
                    console.log('发布资源' + JSON.stringify(response));
                    const {code:code}=response;
                    if (code === '200') {
                        dispatch({type: TYPES.RELEASE_RESOURCE_SUCCESS});
                        //刷新资源列表
                        console.log('刷新资源列表');
                        //刷新资源列表
                        setTimeout(function () {
                            dispatch(fetchResourceList())
                        }, 1000);
                    }
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
            });
        });
    };
}

//添加描述
export function addProductContent(images, description, productId) {
    return (dispatch) => {
        console.log('开始添加描述');
        dispatch({type: TYPES.ADD_RESOURCE_DESC_DOING});
        DeviceStorage.get('tarjeta').then((tags) => {
            let url = ServiceURl.personManager + 'addProductContent?tarjeta=' + tags + '&description=' + description +
                '&productId=' + productId;
            Request.uploadImage(url, images, function (response) {
                //console.log('添加资源描述' + JSON.stringify(response));
                const {code:code}=response;
                if (code === '200') {
                    dispatch({type: TYPES.ADD_RESOURCE_DESC_SUCCESS});
                }
            }, function (err) {
                dispatch({type: TYPES.ADD_RESOURCE_DESC_ERROR});
                console.log(JSON.stringify(err));
            });
        });

    };
}

//下架资源
export function salesDiscontinuation(productId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'salesDiscontinuation';
        let data = '&productId=' + productId;
        Request.postRequest(url, data, function (response) {
            let {code:code}=response;
            if (code === '200') {
                dispatch({type: TYPES.DELETE_RESOURCE_SUCCESS, productId: productId});
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    };
}

//发送推广信息
export function spreadProduct(productId, text, roleTypeId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'spreadProduct';
        let data = '&productId=' + productId + '&text=' + text + '&roleTypeId=' + roleTypeId;
        Request.postRequest(url, data, function (response) {
            console.log('推送消息' + JSON.stringify(response));
            let {code:code}=response;
            if (code === '200') {
                // dispatch({type: TYPES.DELETE_RESOURCE_SUCCESS, productId: productId});
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    };
}

//查询客户关系，浏览记录详情列表
export function queryCustSalesReport(productId) {
    return (dispatch) => {
        let url = ServiceURl.personManager + 'queryCustSalesReport';
        let data = '&productId=' + productId;
        Request.postRequest(url, data, function (response) {
            console.log('查询客户关系，浏览记录详情列表' + JSON.stringify(response));
            let {custList:custList, visitorList:visitorList, placingCustList:placingCustList, partnerList:partnerList}=response;
            dispatch({
                type: TYPES.FETCH_RESOURCE_CUSTMER_INFO,
                custList: custList,
                visitorList: visitorList,
                placingCustList: placingCustList,
                partnerList: partnerList
            });
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    };
}


