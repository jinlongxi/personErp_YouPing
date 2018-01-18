/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMyInfo, uploadPaymentMethods} from '../actions/about';
import {deleteToken} from '../actions/login';
import AboutView from '../components/about/AboutView';
import DeviceStorage from '../utils/deviceStorage';
const mapStateToProps = (state) => {
    return {
        aboutState: state.aboutStore
    }
};


const mapDispatchToProps = (dispatch)=> {
    //请求个人信息数据
    dispatch(fetchMyInfo());
    return {
        //退出登录
        loginOut: ()=> {
            DeviceStorage.delete('tarjeta');
            dispatch(deleteToken())
        },
        //收款方式
        PaymentMethods: (image, partyContentType)=> {
            dispatch(uploadPaymentMethods(image, partyContentType))
        }
    }
};

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutView);
export default AboutContainer
