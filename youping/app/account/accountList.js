/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Request from '../common/request';
import ServiceURl from '../common/service';
import Util from '../common/util';
import DeviceStorage from '../common/deviceStorage';
import Tabs from '../root/tabs'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';

class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            userInfo: null
        };
        this._loginOut=this._loginOut.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.show ?
                            <View style={styles.accountInfo}>
                                <View style={styles.image}>
                                    <Image source={{uri: this.state.userInfo.headPortrait}}
                                           style={styles.image1}
                                           accessibilityLabel="图片加载中。。。"
                                           blurRadius={1}
                                           defaultSource={require('../img/loading.gif')}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>姓名:{this.state.userInfo.personName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>电话:{this.state.userInfo.contactNumber}</Text>
                                </View>
                                <TouchableOpacity style={styles.loginOut} onPress={this._loginOut}>
                                    <Text style={styles.text}>退出登录</Text>
                                </TouchableOpacity>
                            </View>
                            : Util.loading
                    }
                </ScrollView>
            </View>
        );
    }

    //查询我的资源列表
    _getData() {
        const url = ServiceURl.personManager + 'queryPersonInfo';
        const that = this;
        Request.postRequest(url, '', function (response) {
            console.log("我的信息详情" + JSON.stringify(response));
            let {code:code, userInfo:userInfo}=response;
            if (code === '200') {
                that.setState({
                    show: true,
                    userInfo: userInfo
                })
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    //退出登录
    _loginOut(){
        DeviceStorage.delete('tarjeta');
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Tabs',
                component: Tabs,
                params: {}
            })
        }
        alert('退出成功')
    }

    componentWillMount() {
        this._getData();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    },
    accountInfo: {
        justifyContent: 'center',
    },
    image: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        height: 150,
        width: 150,
        borderWidth: 1,
        borderColor: '#1d1d1d',
        borderRadius: 75
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    text: {
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40
    },
    loginOut: {
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#EE6A50',
        margin:20
    },
    loginOutText:{
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40,
        color:'#f0f0f0'
    }
});

export default AccountList
