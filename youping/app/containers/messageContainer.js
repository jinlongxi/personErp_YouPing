/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import MessageView from '../components/message/messageView';
import {connect} from 'react-redux';
import {fetchMessageList} from '../actions/message'

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    //请求数据
    dispatch(fetchMessageList());
    return {}
};

const OrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageView);

export default OrderContainer
