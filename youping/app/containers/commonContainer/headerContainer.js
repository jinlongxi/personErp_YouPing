/**
 * Created by jinlongxi on 17/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../../components/common/header';
import {showTabBar, hideTabBar} from '../../actions/tab/tabAction'
const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //显示TAB
        showTab: ()=> {
            dispatch(showTabBar())
        },
        //隐藏TAB
        hideTab: ()=> {
            dispatch(hideTabBar())
        }
    }
};

const headerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default headerContainer
