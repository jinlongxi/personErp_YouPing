/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import Login from '../components/login/login';
import {connect} from 'react-redux';
import * as WeChat from 'react-native-wechat';
import {weChatLogin} from '../actions/login'
import {
    Alert,
    Platform
} from 'react-native'

const mapStateToProps = (state) => {
    return {
        loginState: state.loginStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //微信登录
        weChatLogin: ()=> {
            WeChat.isWXAppInstalled().then((isInstalled) => {
                console.log('已安装微信');
                if (isInstalled) {
                    let scope = 'snsapi_userinfo';
                    let state = 'wechat_sdk_demo';
                    WeChat.sendAuthRequest(scope,state).then(responseCode => {
                        const {code:code} =responseCode;
                        dispatch(weChatLogin(code))
                    }).catch(err => {
                        Alert.alert('登录授权发生错误：', err.message, [{text: '确定'}]);
                    })
                } else {
                    Platform.OS == 'ios' ? Alert.alert('没有安装微信', '是否安装微信？', [{text: '取消'}, {
                        text: '确定',
                        onPress: () => this.installWechat()
                    }]) : Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [{text: '确定'}])
                }
            })
        },
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer
