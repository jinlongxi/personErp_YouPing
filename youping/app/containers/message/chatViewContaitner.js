/**
 * Created by jinlongxi on 18/2/6.
 */
/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import ChatView from '../../components/message/chatWebView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chatViewCreators from '../../actions/message/chatViewAction';
import {hideTabBar} from '../../actions/tab/tabAction'

const mapStateToProps = (state) => {
    const {messageStore} = state;
    return {
        messageStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const chatViewActions = bindActionCreators(chatViewCreators, dispatch);
    return {
        chatViewActions
    };
    // return {
    //     //查询聊天列表
    //     getMessageList: ()=> {
    //         dispatch(fetchMessageList());
    //     },
    //     //隐藏TAB
    //     hiddenTabBar: ()=> {
    //         dispatch(hideTabBar())
    //     },
    //     //获取客户信息
    //     queryConsumerInfo: (realPartyId,productId)=> {
    //         dispatch(queryConsumerInfo(realPartyId,productId))
    //     },
    //     //清楚消息角标
    //     cleanSessionMessage: (partyIdTo)=> {
    //         dispatch(cleanSessionMessage(partyIdTo))
    //     }
    // }
};

const chatViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatView);

export default chatViewContainer
