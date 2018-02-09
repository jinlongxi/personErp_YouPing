/**
 * Created by jinlongxi on 18/2/7.
 */
/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import ReplyPriceView from '../../components/message/replyPriceView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as replyPriceCreators from '../../actions/message/replyPriceAction';
import {hideTabBar} from '../../actions/tab/tabAction'

const mapStateToProps = (state) => {
    const {replyPriceStore} = state;
    return {
        replyPriceStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const replyPriceActions = bindActionCreators(replyPriceCreators, dispatch);
    return {
        replyPriceActions,
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
    };
};

const ReplyPriceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReplyPriceView);

export default ReplyPriceContainer
