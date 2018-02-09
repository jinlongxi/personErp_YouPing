/**
 * Created by jinlongxi on 18/2/9.
 */
import * as TYPES from '../../constants/ActionTypes';
const initialState = {
    loading: false,
    resourceListData: [],
    status: null,
    isRefreshing: false,
};

export default function resourceList(state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCH_RESOURCE_LIST:
            return {
                ...state,
                loading: true,
                status: 'doing'
            };
        case TYPES.RECEIVE_RESOURCE_LIST:
            return Object.assign({}, state, {
                loading: false,
                isRefreshing: false,
                resourceListData: action.resourceListData,
                status: 'done'
            });
        //下拉刷新
        case TYPES.REFRESH_RESOURCE_LIST:
            return {
                ...state,
                isRefreshing: true,
                status: 'doing'
            };
        //下架资源成功
        case TYPES.FETCH_SALES_DISCONTINUATION_SUCCESS:
            return Object.assign({}, state, {
                resourceListData: state.resourceListData.filter((item)=> {
                    if (item.productId !== action.productId) {
                        return item
                    }
                }),
            });
        default:
            return state;
    }
}
