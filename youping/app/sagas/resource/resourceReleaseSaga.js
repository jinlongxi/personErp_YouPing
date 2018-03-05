/**
 * Created by jinlongxi on 18/2/9.
 */
/**
 * Created by jinlongxi on 18/2/9.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request, upLoadImage} from '../../utils/RequestUtil';
import ToastUtil from '../../utils/ToastUtil';
import {
    fetchProductFeatures,
    receiveProductFeatures,
    fetchResourceRelease,
    fetchResourceReleaseSuccess
} from '../../actions/resource/resourceReleaseAction';
import {requestResourceList} from '../../actions/resource/resourceListAction';
import ServiceURl from '../../utils/service';
import DeviceStorage from '../../utils/deviceStorage';

// function* requestProductFeatures() {
//     try {
//         yield put(fetchProductFeatures());
//         const url = ServiceURl.personManager + 'queryProductFeatures';
//         const {code, productFeaturesList}= yield call(request, url, 'post');
//         console.log(productFeaturesList);
//         if (code === '200') yield put(receiveProductFeatures(productFeaturesList));
//     } catch (error) {
//         //yield put(receiveConsumerInfo([]));
//     }
// }
//
// //监听请求资源请求特征列表
// export function* watchRequestProductFeatures() {
//     while (true) {
//         yield take(types.REQUEST_PRODUCT_FEATURES);
//         yield fork(requestProductFeatures);
//     }
// }

//发布资源
function* requestResourceRelease(resourceImages, resourceName, resourceDescription = '没有描述', resourcePrice = 0, resourceStoreNumber = 9999, resourceFeatures) {
    try {
        yield put(fetchResourceRelease());
        const tarjeta = yield DeviceStorage.get('tarjeta');
        const productCategoryId = yield DeviceStorage.get('productCategoryId');
        const url = ServiceURl.personManager + 'releaseResource?tarjeta=' + tarjeta + '&productName=' + resourceName +
            '&description=' + resourceDescription + '&productCategoryId=' + productCategoryId + '&quantityTotal=' + resourceStoreNumber +
            '&productPrice=' + resourcePrice;//+'&productFeatures=' + JSON.stringify(resourceFeatures)
        const {code} = yield call(upLoadImage, url, 'post', resourceImages);
        if (code === '200') {
            yield put(fetchResourceReleaseSuccess());
            //成功刷新资源列表
            yield put(requestResourceList());
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//编辑资源
function* requestResourceUpdate(resourceName,
                                resourceDescription,
                                resourcePrice,
                                resourceStoreNumber,
                                productId) {
    try {
        yield put(fetchResourceRelease());
        const tarjeta = yield DeviceStorage.get('tarjeta');
        const productCategoryId = yield DeviceStorage.get('productCategoryId');
        const url = ServiceURl.personManager + 'updateResourceInfo?tarjeta=' + tarjeta + '&productName=' + resourceName +
            '&description=' + resourceDescription + '&productId=' + productId + '&quantityTotal=' + resourceStoreNumber +
            '&productPrice=' + resourcePrice;
        console.log(url);
        const {code} = yield call(request, url, 'post');
        if (code === '200') {
            yield put(fetchResourceReleaseSuccess());
            //成功刷新资源列表
            yield put(requestResourceList());
        }
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
        ToastUtil.showShort('加载错误，请重新加载')
    }
}

//监听请求发布资源
export function* watchRequestResourceRelease() {
    while (true) {
        const {
            resourceImages,
            resourceName,
            resourceDescription,
            resourcePrice,
            resourceStoreNumber,
            resourceFeatures,
            currentType,
            productId
        }=yield take(types.REQUEST_RESOURCE_RELEASE);

        if (currentType === '发布') {
            yield fork(
                requestResourceRelease,
                resourceImages,
                resourceName,
                resourceDescription,
                resourcePrice,
                resourceStoreNumber,
                resourceFeatures,
            );
        } else {
            yield fork(
                requestResourceUpdate,
                resourceName,
                resourceDescription,
                resourcePrice,
                resourceStoreNumber,
                productId
            );
        }
    }
}




