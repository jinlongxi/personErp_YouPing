/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import ClientInfo from '../components/message/clientInfo';
import {connect} from 'react-redux';
import {queryConsumerInfo,fetchLogistics,fetchPaymentReceived} from '../actions/message';
import deviceStorage from '../utils/deviceStorage';

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //获取客户信息
        queryConsumerInfo:(realPartyId)=>{
            dispatch(queryConsumerInfo(realPartyId))
        },
        //确定发货
        delivery: (code)=> {
            deviceStorage.get('orderId').then((orderId)=>{
                console.log(code,orderId)
                dispatch(fetchLogistics(code,orderId));
            });

        },
        //确定已收款
        paymentReceived: (productId,realPartyId)=> {
            console.log(productId,realPartyId)
            dispatch(fetchPaymentReceived(productId,realPartyId));
        }
    }
};

const ClientContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientInfo);

export default ClientContainer
