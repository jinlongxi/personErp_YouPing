/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import ClientInfo from '../components/message/chatWebView';
import {connect} from 'react-redux';
import {queryConsumerInfo} from '../actions/message';
import deviceStorage from '../utils/deviceStorage';

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //获取客户信息
        queryConsumerInfo:(realPartyId,productId)=>{
            dispatch(queryConsumerInfo(realPartyId,productId))
        },
    }
};

const ClientContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientInfo);

export default ClientContainer
