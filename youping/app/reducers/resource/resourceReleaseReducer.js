/**
 * Created by jinlongxi on 18/2/9.
 */
import * as TYPES from '../../constants/ActionTypes';
const initialState = {
    loading: false,
    featuresListData: [],
    status: null,
    resourceName: null,
    resourceImages: [],
    resourceAdvancedOptions: false,
    resourceDescription: undefined,
    resourcePrice: undefined,
    resourceStoreNumber: undefined,
    resourceFeatures: [],
    showFeaturesModel: false,
    currentType: '发布'
};

export default function resourceRelease(state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCH_PRODUCT_FEATURES:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };
        case TYPES.RECEIVE_PRODUCT_FEATURES:
            return Object.assign({}, state, {
                loading: false,
                featuresListData: action.featuresListData,
                status: 'done'
            });
        case TYPES.SET_RESOURCE_NAME:
            return {
                ...state,
                resourceName: action.name
            };
        case TYPES.SET_RESOURCE_IMAGES:
            return {
                ...state,
                resourceImages: action.images
            };
        case TYPES.SET_RESOURCE_ADVANCED:
            return {
                ...state,
                resourceAdvancedOptions: action.AdvancedOptions
            };
        case TYPES.SET_RESOURCE_DESCRIPTION:
            return {
                ...state,
                resourceDescription: action.description
            };
        case TYPES.SET_RESOURCE_PRICE:
            return {
                ...state,
                resourcePrice: action.price
            };
        case TYPES.SET_RESOURCE_STORE_NUMBER:
            return {
                ...state,
                resourceStoreNumber: action.num
            };
        case TYPES.SET_RESOURCE_FEATURES:
            return {
                ...state,
                resourceFeatures: [action.features, ...state.resourceFeatures]
            };
        //显示隐藏特征模态框
        case TYPES.SHOW_FEATURES_MODEL:
            return {
                ...state,
                showFeaturesModel: action.boolean
            };
        //发布资源
        case TYPES.FETCH_RESOURCE_RELEASE:
            return {
                ...state,
                loading: true
            };
        case TYPES.FETCH_RESOURCE_RELEASE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: 'success'
            };
        //设置当前页面是发布还是编辑
        case TYPES.SET_PAGE_TYPE:
            return {
                ...state,
                currentType: '编辑'
            };
        //清理数据
        case TYPES.CLEAR_RESOURCE_RELEASE:
            return {
                loading: false,
                featuresListData: [],
                status: null,
                resourceName: null,
                resourceImages: [],
                resourceAdvancedOptions: false,
                resourceDescription: undefined,
                resourcePrice: undefined,
                resourceStoreNumber: undefined,
                resourceFeatures: [],
                showFeaturesModel: false,
                currentType: '发布'
            };
        default:
            return state;
    }
}
