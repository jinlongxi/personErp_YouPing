/**
 * Created by jinlongxi on 18/2/7.
 */
import * as TYPES from '../../constants/ActionTypes';
const initialState = {
    loading: false,
    resourceDetailData: null,
    status: null,
    showShareModel: false
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
        //分享模态框
        case TYPES.SHOW_SHARE_MODEL:
            return Object.assign({}, state, {
                showShareModel: !state.showShareModel
            });
        default:
            return state;
    }
}
