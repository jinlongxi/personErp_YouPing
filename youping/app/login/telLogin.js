/**
 * Created by jinlongxi on 17/9/11.
 */
//初始化类
import React, {Component} from 'react';
import Request from '../common/request';
import ServiceURl from '../common/service';
import DeviceInfo from 'react-native-device-info';
import Header from '../common/header';
import DeviceStorage from '../common/deviceStorage';
import CompleteInfo from './completeInformation';
import Tabs from '../root/tabs'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    AsyncStorage
} from 'react-native';

export default class TelLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,      //JSON.stringify(new Date().getTime()).substring(0, 11)
            loginBtn: '获取验证码',
            sented: false,
            timerCount: 30,
            captcha: null,
            tarjeta: null,
        };
        this._countDownAction = this._countDownAction.bind(this);
        this._getVerifyCode = this._getVerifyCode.bind(this);
        this._login = this._login.bind(this)
    }

    //获取验证码
    _getVerifyCode() {
        const url = ServiceURl.platformManager + 'getTelCaptcha';

        let formData = new FormData();
        formData.append("teleNumber", this.state.phoneNumber);
        const that = this;
        Request.postRequestLogin(url, formData, function (response) {
            console.log(JSON.stringify(response));
            let {code:code, captcha:captcha}=response;
            if (code === '200') {
                that.setState({
                    loginBtn: '登录',
                    sented: true,
                    captcha: captcha
                });
                that._countDownAction()
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    //验证码倒计时
    _countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1;
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    loginBtn: '获取验证码',
                    sented: false,
                })
            } else {
                this.setState({
                    timerCount: timer,
                })
            }
        }, 1000)
    }

    //获取手机号变化
    _phoneNumberChange(text) {
        this.setState({
            phoneNumber: text
        });
    }

    //登录
    _login() {
        if (this.state.sented) {
            const uuid = DeviceInfo.getUniqueID() + '/' + new Date().getTime();
            const url = ServiceURl.platformManager + 'userAppLogin';

            let formData = new FormData();
            formData.append("userLoginId", this.state.phoneNumber);
            formData.append("captcha", this.state.captcha);
            formData.append("uuid", uuid);
            const that = this;
            //获取tarjeta
            Request.postRequestLogin(url, formData, function (response) {
                console.log(JSON.stringify(response));
                let {code:code, tarjeta:tarjeta, newUser:newUser}=response;
                if (code === '200') {
                    //过去我的纬度名单
                    let url = ServiceURl.platformManager + 'queryLocalRoster';
                    Request.postRequestF(url, tarjeta, function (response) {
                        console.log(JSON.stringify(response) + '------------------tarjeta－－－－－－－－－－－－－－－－')
                    }, function (err) {
                        console.log(JSON.stringify(err))
                    });
                    that.setState({
                        tarjeta: tarjeta
                    });
                    if (DeviceStorage.get('tarjeta') == '') {
                        console.log('保存TOKEN');
                        DeviceStorage.save('tarjeta', tarjeta);
                    } else {
                        console.log('更新TOKEN');
                        DeviceStorage.update('tarjeta', tarjeta);
                    }
                    if (newUser === 'N') {
                        setTimeout(function () {
                            that._home()
                        }, 3000);
                        console.log('我在等待在等待--------------------------')
                    } else {
                        that._completeInfo();
                    }
                } else {
                    alert('验证码不正确')
                }
            }, function (err) {
                console.log(JSON.stringify(err))
            });
        } else {
            this._getVerifyCode()
        }
    }

    //登录成功后跳转到首页
    _home() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Tabs',
                component: Tabs,
                params: {
                    tarjeta: this.state.tarjeta
                }
            })
        }
    }

    //完善资料
    _completeInfo() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'CompleteInfo',
                component: CompleteInfo,
                params: {}
            })
        }
    }

    //渲染页面
    render() {
        return (
            <View style={styles.container}>
                <Header
                    initObj={{backName: '返回', barTitle: '手机登录'}}
                    navigator={this.props.navigator}
                />

                <View style={styles.avatarview}>
                    <Image style={styles.avatarimage}>
                    </Image>
                </View>

                <View style={styles.inputview}>
                    <TextInput style={styles.textinput}
                               placeholder='手机号'
                               value={this.state.phoneNumber}
                               autoCorrect={false}
                               underlinecolorandroid='transparent'
                               onChangeText={(text)=>this._phoneNumberChange(text)}
                               keyboardType="numeric"
                               returnKeyType="done"
                               clearButtonMode="never"

                    />
                    <View style={styles.dividerview}><Text style={styles.divider}></Text></View>
                    <TextInput style={styles.textinput}
                               placeholder='验证码'
                               value={this.state.captcha}
                               keyboardType="numeric"
                               returnKeyType="done"
                               clearButtonMode="always"
                               keyboardAppearance="dark"
                               underlinecolorandroid='transparent'
                               onChangeText={(text)=>this.setState({
                                   captcha: text
                               })}
                    />
                    {
                        this.state.sented ? <Text style={styles.codeCount}>{this.state.timerCount}s</Text> : null
                    }
                </View>

                <View style={styles.buttomview}>
                    <TouchableOpacity style={styles.buttonview}
                                      onPress={this._login}>
                        <Text style={styles.logintext}
                        >{this.state.loginBtn}</Text>
                    </TouchableOpacity>

                    <View style={styles.emptyview}></View>

                    <View style={styles.bottombtnsview}>
                        <View style={styles.bottomleftbtnview}>
                            <Text style={styles.bottombtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomrightbtnview}>
                            <Text style={styles.bottombtn}>《免责条款》</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,//可拉伸
        flexDirection: 'column'
    },
    header: {//头部高度
        height: 50,
        justifyContent: 'center',//水平方向
    },
    headtitle: {//头部标题
        alignSelf: 'center',
        fontSize: 18,
        color: '#000000',
    },
    avatarview: {//登录图标区域
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {//登录图标
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    inputview: {//用户名/密码区域
        height: 100,
    },
    textinput: {//用户名/密码输入框
        flex: 1,
        borderWidth: 0,
        fontSize: 16,
        paddingLeft: 16
    },
    codeCount: {//验证码倒计时
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    dividerview: {//分割线区域
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    buttomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        flexDirection: 'row',
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        alignSelf: 'center',
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    },
});
