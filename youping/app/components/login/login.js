/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ParallaxView from 'react-native-parallax-view';
import Util from '../../utils/util';
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
    PixelRatio,
    Platform
} from 'react-native';

class Login extends Component {
    render() {
        const {loading}=this.props.loginStore;
        return (
            loading ? Util.loading :
                <View style={styles.container}>
                    <ParallaxView
                        backgroundSource={require('../../img/login/jianjie.jpg')}
                    >
                    </ParallaxView>
                    <TouchableOpacity style={styles.btnWeChat} onPress={()=> {
                        this._weChatLogin()
                    }}>
                        <Image
                            source={require('../../img/login/wechat.jpg')}
                            style={styles.icon}/>
                        <Text style={styles.btn}>微信登录</Text>
                    </TouchableOpacity>
                </View>
        )
    }

    //微信登录
    _weChatLogin() {
        WeChat.isWXAppInstalled().then((isInstalled) => {
            if (isInstalled) {
                let scope = 'snsapi_userinfo';
                let state = 'wechat_sdk_demo';
                WeChat.sendAuthRequest(scope, state).then(responseCode => {
                    console.log(responseCode);
                    const {code:code} =responseCode;
                    const {loginActions}=this.props;
                    loginActions.requstWeChatLogin(code);
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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    },
    btnWeChat: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3,
        height: 200
    },
    btn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 5
    },


});

export default Login
