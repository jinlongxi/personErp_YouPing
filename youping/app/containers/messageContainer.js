/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import MessageView from '../components/message/messageView';
import {connect} from 'react-redux';
import {fetchMessageList, queryConsumerInfo, cleanSessionMessage} from '../actions/message'
import {hideTabBar} from '../actions/tab'

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
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
        //获取客户信息
        queryConsumerInfo: (realPartyId,productId)=> {
            dispatch(queryConsumerInfo(realPartyId,productId))
        },
        //清楚消息角标
        cleanSessionMessage: (partyIdTo)=> {
            dispatch(cleanSessionMessage(partyIdTo))
        }
    }
};

const OrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageView);

export default OrderContainer