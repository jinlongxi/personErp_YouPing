/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import OrderView from '../components/order/orderView';
import {connect} from 'react-redux';
import {fetchOrderList} from '../actions/order'

const mapStateToProps = (state) => {
    return {
        orderState: state.orderStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    //请求数据
    dispatch(fetchOrderList());
    return {}
};

const OrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderView);

export default OrderContainer
