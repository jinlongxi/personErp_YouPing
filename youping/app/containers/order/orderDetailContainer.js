/**
 * Created by jinlongxi on 18/2/28.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderDetailCreators from '../../actions/order/orderDetailAction';
import OrderDetail from '../../components/order/orderDetail';

const mapStateToProps = (state) => {
    const {orderDetailStore} = state;
    return {
        orderDetailStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const orderDetailActions = bindActionCreators(orderDetailCreators, dispatch);
    return {
        orderDetailActions,
    };
};

const orderDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetail);
export default orderDetailContainer
