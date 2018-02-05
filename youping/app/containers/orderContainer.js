/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import OrderView from '../components/order/orderView';
import {connect} from 'react-redux';
import {fetchOrderList, fetchLogistics, fetchPaymentReceived, fetchExpress} from '../actions/order'
import {hideTabBar} from '../actions/tab'

const mapStateToProps = (state) => {
    return {
        orderState: state.orderStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //请求订单列表数据
        getOrderList: (type)=> {
            dispatch(fetchOrderList(type));
        },
        //请求订单详情
        queryMyOrdersDetail: (orderId)=> {
            dispatch(fetchOrdersDetail(orderId));
        },
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
        //确定发货
        delivery: (code, orderId)=> {
            dispatch(fetchLogistics(code, orderId));
        },
        //确定已收款
        paymentReceived: (orderId)=> {
            dispatch(fetchPaymentReceived(orderId));
        },
    }
};

const OrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderView);

export default OrderContainer
