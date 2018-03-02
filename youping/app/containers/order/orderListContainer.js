/**
 * Created by jinlongxi on 18/2/28.
 */
/**
 * Created by jinlongxi on 18/2/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderListCreators from '../../actions/order/orderListAction';
import OrderList from '../../components/order/orderList';

const mapStateToProps = (state) => {
    const {orderListStore} = state;
    return {
        orderListStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const orderListActions = bindActionCreators(orderListCreators, dispatch);
    return {
        orderListActions,
    };
};

const orderListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList);
export default orderListContainer
