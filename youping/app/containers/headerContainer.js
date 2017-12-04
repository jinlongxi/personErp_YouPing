/**
 * Created by jinlongxi on 17/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessageList} from '../actions/message'
import Header from '../components/common/header';
import {fetchResourceList} from '../actions/resource';
import {fetchOrderList} from '../actions/order';
import {showTabBar, hideTabBar} from '../actions/tab'
const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //查询聊天列表
        getMessageList: ()=> {
            dispatch(fetchMessageList());
        },
        //查询资源列表
        getResourceList: ()=> {
            dispatch(fetchResourceList());
        },
        //查询我的订单列表
        getOrderList: ()=> {
            dispatch(fetchOrderList());
        },
        //显示TAB
        showTab: ()=> {
            dispatch(showTabBar())
        }
    }
};

const headerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default headerContainer
