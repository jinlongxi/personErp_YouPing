/**
 * Created by jinlongxi on 18/2/9.
 */
/**
 * Created by jinlongxi on 18/2/9.
 */
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../../constants/ActionTypes';
import {request, upLoadImage} from '../../utils/RequestUtil';
import {
    fetchProductFeatures,
    receiveProductFeatures,
    fetchResourceRelease,
    fetchResourceReleaseSuccess
} from '../../actions/resource/resourceReleaseAction';
import ServiceURl from '../../utils/service';
import DeviceStorage from '../../utils/deviceStorage';

function* requestProductFeatures() {
    try {
        yield put(fetchProductFeatures());
        const url = ServiceURl.personManager + 'queryProductFeatures';
        const {code, productFeaturesList}= yield call(request, url, 'post');
        if (code === '200') yield put(receiveProductFeatures(productFeaturesList));
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听请求资源列表
export function* watchRequestProductFeatures() {
    while (true) {
        yield take(types.REQUEST_PRODUCT_FEATURES);
        yield fork(requestProductFeatures);
    }
}

function* requestResourceRelease(resourceImages, resourceName, resourceDescription, resourcePrice, resourceStoreNumber, resourceFeatures) {
    try {
        yield put(fetchResourceRelease());
        const tarjeta = yield DeviceStorage.get('tarjeta');
        const productCategoryId = yield DeviceStorage.get('productCategoryId');
        const url = ServiceURl.personManager + 'releaseResource?tarjeta=' + tarjeta + '&productName=' + resourceName +
            '&description=' + resourceDescription + '&productCategoryId=' + productCategoryId + '&quantityTotal=' + '999' + '&productPrice=' + resourcePrice +
            '&productFeatures=' + JSON.stringify(resourceFeatures);
        const responseData = yield call(upLoadImage, url, 'post', resourceImages);
        console.log(responseData);
    } catch (error) {
        //yield put(receiveConsumerInfo([]));
    }
}

//监听发布资源
export function* watchRequestResourceRelease() {
    while (true) {
        const {
            resourceImages,
            resourceName,
            resourceDescription,
            resourcePrice,
            resourceStoreNumber,
            resourceFeatures
        }=yield take(types.REQUEST_RESOURCE_RELEASE);
        yield fork(
            requestResourceRelease,
            resourceImages,
            resourceName,
            resourceDescription,
            resourcePrice,
            resourceStoreNumber,
            resourceFeatures
        );
    }
}




