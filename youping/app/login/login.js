/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import TelLogin from './telLogin'
import DeviceStorage from '../common/deviceStorage'
import Home from '../home/homeList'
import Navigator from '../common/navigation';
import * as WeChat from 'react-native-wechat';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView,
    Alert,
    PixelRatio
} from 'react-native';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    //手机登录
    _telLogin() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'TelLogin',
                component: TelLogin,
                params: {}
            })
        }
    }

    //微信登录
    _weChatLogin() {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        WeChat.isWXAppInstalled().then((isInstalled) => {
            if (isInstalled) {
                WeChat.sendAuthRequest(scope, state).then(responseCode => {
                    //this.getAccessToken(responseCode.code);
                    alert(JSON.stringify(responseCode))
                }).catch(err => {
                    //Alert.alert('登录授权发生错误：', err.message, [{text: '确定'}]);
                })
            } else {
                Platform.OS == 'ios' ? Alert.alert('没有安装微信', '是否安装微信？', [{text: '取消'}, {
                    text: '确定',
                    onPress: () => this.installWechat()
                }]) : Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [{text: '确定'}])
            }
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnWechat} onPress={this._weChatLogin.bind(this)}>
                    <Image
                        source={require('../img/login/wechat.jpg')}
                        style={styles.icon}/>
                    <Text style={styles.btn}  {...this.props}>微信登录{PixelRatio.get()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTel} onPress={this._telLogin.bind(this)}>
                    <Image
                        source={require('../img/login/tel.png')}
                        style={styles.icon}/>
                    <Text style={styles.btn}  {...this.props}>手机登录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        WeChat.registerApp('wx5843eeb488708c80');
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    alert('您已经安装了微信，可以使用微信登录')
                } else {
                    toastShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 200,
        justifyContent: 'center',
    },
    btnWechat: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3
    },
    btnTel: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 44
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 5
    },


});

export default Login
