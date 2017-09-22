/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import TelLogin from './telLogin'
import DeviceStorage from '../common/deviceStorage'
import Home from '../home/homeList'
import Navigator from '../common/navigation'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView
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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnWechat}>
                    <Image
                        source={require('../img/login/wechat.jpg')}
                        style={styles.icon}/>
                    <Text style={styles.btn}  {...this.props}>微信登录</Text>
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
