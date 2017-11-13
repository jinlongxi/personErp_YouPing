/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import MessageView from '../components/message/messageView';
import {connect} from 'react-redux';
import {fetchMessageList, fetchMessageOne, sendMessageOne} from '../actions/message'

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //查询聊天列表
        getMessageList: ()=> {
            dispatch(fetchMessageList());
        },
    }
};

const OrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageView);

export default OrderContainer
