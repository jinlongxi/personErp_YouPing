/**
 * Created by jinlongxi on 18/2/9.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求特征列表
export function requestProductFeatures() {
    return {
        type: TYPES.REQUEST_PRODUCT_FEATURES,
    };
}

//发起网络请求特征列表
export function fetchProductFeatures() {
    return {
        type: TYPES.FETCH_PRODUCT_FEATURES,
    };
}

//接受特征列表数据
export function receiveProductFeatures(featuresListData) {
    return {
        type: TYPES.RECEIVE_PRODUCT_FEATURES,
        featuresListData
    };
}

//设置资源名称
export function setResourceName(name) {
    return {
        type: TYPES.SET_RESOURCE_NAME,
        name
    };
}

//设置资源图片
export function setResourceImages(images) {
    return {
        type: TYPES.SET_RESOURCE_IMAGES,
        images
    };
}

//开启高级选项
export function setResourceAdvancedOptions(AdvancedOptions) {
    return {
        type: TYPES.SET_RESOURCE_ADVANCED,
        AdvancedOptions
    };
}

//设置资源描述
export function setResourceDescription(description) {
    return {
        type: TYPES.SET_RESOURCE_DESCRIPTION,
        description
    };
}

//设置资源价格
export function setResourcePrice(price) {
    return {
        type: TYPES.SET_RESOURCE_PRICE,
        price
    };
}

//设置资源库存
export function setResourceStoreNumber(num) {
    return {
        type: TYPES.SET_RESOURCE_STORE_NUMBER,
        num
    };
}

//设置资源特征
export function setResourceFeatures(features) {
    return {
        type: TYPES.SET_RESOURCE_FEATURES,
        features
    };
}

//设置当前页面为资源发布还是编辑
export function setPageType() {
    return {
        type: TYPES.SET_PAGE_TYPE,
    };
}

//清除数据
export function clearResourceRelease() {
    return {
        type: TYPES.CLEAR_RESOURCE_RELEASE,
    };
}

//点击弹出隐藏特征模态框
export function showFeaturesModel(boolean) {
    return {
        type: TYPES.SHOW_FEATURES_MODEL,
        boolean
    };
}

//请求发布资源
export function requestResourceRelease(resourceImages, resourceName, resourceDescription, resourcePrice, resourceStoreNumber, resourceFeatures,currentType,productId) {
    return {
        type: TYPES.REQUEST_RESOURCE_RELEASE,
        resourceImages,
        resourceName,
        resourceDescription,
        resourcePrice,
        resourceStoreNumber,
        resourceFeatures,
        currentType,
        productId
    };
}

//网络请求发布资源
export function fetchResourceRelease() {
    return {
        type: TYPES.FETCH_RESOURCE_RELEASE,
    };
}

//发布资源成功
export function fetchResourceReleaseSuccess() {
    return {
        type: TYPES.FETCH_RESOURCE_RELEASE_SUCCESS,
    };
}

// //查询资源特征信息
// export function queryProductFeatures(productId) {
//     return (dispatch) => {
//         let url = ServiceURl.personManager + 'queryProductFeatures';
//         let data = '&productId=' + productId;
//         Request.postRequest(url, data, function (response) {
//             console.log('查询资源特征信息' + JSON.stringify(response));
//         }, function (err) {
//             console.log(JSON.stringify(err))
//         })
//     };
// }