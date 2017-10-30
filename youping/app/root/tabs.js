/**
 * Created by jinlongxi on 17/9/21.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Login from '../login/login';
import Navigation from '../common/navigation';
import DeviceStorage from '../common/deviceStorage';
import Home from '../home/homeList';
import Account from '../account/accountList';
import Search from '../search/search';
import Order from '../order/orderList';
import Entry from './entry';
import ServiceURl from '../common/service';
import Request from '../common/request';
import DeviceInfo from 'react-native-device-info';
import JPushModule from 'jpush-react-native';
import SingleChat from '../common/singleChat';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image
} from 'react-native';



class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Event',
            tarjeta: null,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.tarjeta != null ?
                        <TabNavigator>
                            <TabNavigator.Item
                                //设置选中的位置
                                selected={this.state.selectedTab === 'Event'}
                                //标题
                                title="首页"
                                //标题样式
                                titleStyle={styles.tabText}
                                //选中时标题文字样式
                                selectedTitleStyle={styles.selectedTabText}
                                //图标
                                renderIcon={() => <Image style={styles.icon} source={require('../img/tabs/home.png')}/>}
                                //选中时图标
                                renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                                 source={require("../img/tabs/home.png")}/>}
                                //点击Event
                                onPress={() => this.setState({selectedTab: 'Event'})}>
                                <Navigation component={Home}/>
                            </TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Log'}
                                title="搜索"
                                titleStyle={styles.tabText}
                                selectedTitleStyle={styles.selectedTabText}
                                renderIcon={() => <Image style={styles.icon}
                                                         source={require("../img/tabs/search.png")}/>}
                                renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                                 source={require("../img/tabs/search.png")}/>}
                                onPress={() => this.setState({selectedTab: 'Log'})}>
                                <Navigation component={Search}/>
                            </TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Device'}
                                title="管理"
                                titleStyle={styles.tabText}
                                selectedTitleStyle={styles.selectedTabText}
                                renderIcon={() => <Image style={styles.icon}
                                                         source={require("../img/tabs/manager.png")}/>}
                                renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                                 source={require("../img/tabs/manager.png")}/>}
                                onPress={() => this.setState({selectedTab: 'Device'})}>
                                <Navigation component={Order}/>
                            </TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'User'}
                                title="我"
                                titleStyle={styles.tabText}
                                selectedTitleStyle={styles.selectedTabText}
                                renderIcon={() => <Image style={styles.icon}
                                                         source={require("../img/tabs/contact.png")}/>}
                                renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                                 source={require("../img/tabs/contact.png")}/>}
                                onPress={() => this.setState({selectedTab: 'User'})}>
                                <Navigation component={Account}/>
                            </TabNavigator.Item>
                        </TabNavigator> : <Navigation component={Login}/>
                }
            </View>
        );
    }

    //发送极光registration到后台
    _postRegistrationId(registrationId) {
        const url = ServiceURl.platformManager + 'regJpushRegId';
        const deviceType = DeviceInfo.getUserAgent();
        const data = '&regId=' + registrationId + '&deviceType=' + deviceType;
        Request.postRequest(url, data, function (response) {
            console.log("发送极光registration返回信息" + JSON.stringify(response));
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    //异地登录挤掉
    _loginOut() {
        DeviceStorage.delete('tarjeta');
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Login',
                component: Login,
                params: {}
            })
        }
        alert('异地登录')
    }

    //跳转到聊天页面
    _singleChat(partyId,partyIdFrom,orderId){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'SingleChat',
                component: SingleChat,
                params: {
                    payToPartyId:partyIdFrom,
                    partyIdFrom:partyIdFrom,
                    orderId:orderId
                }
            })
        }
    }

    componentWillMount() {
        //更新我的维度好友名单
        Entry.updateRoster();

        //获取tarjeta用于
        DeviceStorage.get('tarjeta').then((tags) => {
            this.setState({
                tarjeta: tags
            })
        });

        //获取registrationId
        JPushModule.getRegistrationID((registrationId) => {
            this._postRegistrationId(registrationId)
        });
        //接收消息
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: 接收到的消息" + JSON.stringify(map.aps.alert));
            //console.log("extras: " + map.extras);
            // var extra = JSON.parse(map.extras);
            // console.log(extra.key + ": " + extra.value);
        });
        //接受通知
        JPushModule.addReceiveCustomMsgListener((map) => {
            console.log('alertContent: lalalalalalalalalalalalalalalalalalalalalalalalalalalallalaal'+JSON.stringify(map));
            if (map.content === "loginNotification") {
                this._loginOut()
            }
            console.log('sdaljhfgashdfjkgasdkfjhgsadfkhjagsdfkjhasgdfkasdjhfgasdkfjsga'+map.content.search('message'));
            if (map.content.search('message')=='0') {
                console.log('09090909090909090909090909090909090909090909090909090909');
                this._singleChat(map.content.slice(8,13),map.content.slice(14,19),map.content.slice(20,25))
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: 'red'
    },
    icon: {
        width: 22,
        height: 22
    },
    page0: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    page1: {
        flex: 1,
        //backgroundColor: 'blue'
    }
});

export default Tabs
