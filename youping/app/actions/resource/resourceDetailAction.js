/**
 * Created by jinlongxi on 18/2/7.
 */
import * as TYPES from '../../constants/ActionTypes';

//请求资源详情
export function requestResourceDetail(productId) {
    return {
        type: TYPES.REQUEST_RESOURCE_DETAIL,
        productId
    };
}

//发起网络请求资源详情
export function fetchResourceDetail() {
    return {
        type: TYPES.FETCH_RESOURCE_DETAIL,
    };
}

//接受资源详情数据
export function receiveResourceDetail(resourceDetailData) {
    return {
        type: TYPES.RECEIVE_RESOURCE_DETAIL,
        resourceDetailData
    };
}

//点击微信分享  显示微信分享模态框
export function showWechatShareModle() {
    return {
        type: TYPES.SHOW_SHARE_MODEL,
    };
}

// //查询客户关系，浏览记录详情列表
// export function queryCustSalesReport(productId) {
//     return (dispatch) => {
//         let url = ServiceURl.personManager + 'queryCustSalesReport';
//         let data = '&productId=' + productId;
//         Request.postRequest(url, data, function (response) {
//             console.log('查询客户关系，浏览记录详情列表' + JSON.stringify(response));
//             let {custList:custList, visitorList:visitorList, placingCustList:placingCustList, partnerList:partnerList}=response;
//             dispatch({
//                 type: TYPES.FETCH_RESOURCE_CUSTMER_INFO,
//                 custList: custList,
//                 visitorList: visitorList,
//                 placingCustList: placingCustList,
//                 partnerList: partnerList
//             });
//         }, function (err) {
//             console.log(JSON.stringify(err))
//         })
//     };
// }
