/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import MessageView from '../../components/message/messageView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageCreators from '../../actions/message/messageAction';
import {hideTabBar} from '../../actions/tab/tabAction'

const mapStateToProps = (state) => {
    const {messageStore} = state;
    return {
        messageStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const messageActions = bindActionCreators(messageCreators, dispatch);
    return {
        messageActions,
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
    };
};

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageView);

export default MessageContainer
