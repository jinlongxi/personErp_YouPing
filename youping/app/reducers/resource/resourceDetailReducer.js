/**
 * Created by jinlongxi on 18/2/7.
 */
import * as TYPES from '../../constants/ActionTypes';
const initialState = {
    loading: false,
    resourceDetailData: null,
    status: null,
    showShareModel: false,
    shareText: undefined
};

export default function resourceDetail(state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCH_RESOURCE_DETAIL:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };
        case TYPES.RECEIVE_RESOURCE_DETAIL:
            return Object.assign({}, state, {
                loading: false,
                resourceDetailData: action.resourceDetailData,
                status: 'done'
            });
        //清除资源详情数据
        case TYPES.CLEAR_RECEIVE_RESOURCE_DETAIL:
            return Object.assign({}, state, {
                resourceDetailData: null,
                status: 'clear'
            });
        //分享模态框
        case TYPES.SHOW_SHARE_MODEL:
            return Object.assign({}, state, {
                showShareModel: !state.showShareModel
            });
        case TYPES.SET_WECHAT_SHARE_TEXT:
            return Object.assign({}, state, {
                shareText: action.shareText
            });
        default:
            return state;
    }
}
