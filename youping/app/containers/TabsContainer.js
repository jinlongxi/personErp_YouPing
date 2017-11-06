/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';
import Resource from './resourceContainer';
import Order from './orderContainer';
import Message from './messageContainer';
import About from '../containers/aboutContainer';
import Navigation from '../utils/navigation';
import JPushModule from 'jpush-react-native';
import ServiceURl from '../utils/service';
import Request from '../utils/request';
import DeviceInfo from 'react-native-device-info';
import DeviceStorage from '../utils/deviceStorage';
import {deleteToken} from '../actions/login';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image
} from 'react-native'

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: props.selectedTab || 'Event'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        //设置选中的位置
                        selected={this.state.selectedTab === 'Event'}
                        //标题
                        title="资源"
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
                        <Navigation component={Resource}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Device'}
                        title="订单"
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
                        selected={this.state.selectedTab === 'Message'}
                        title="消息"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../img/tabs/search.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                         source={require("../img/tabs/search.png")}/>}
                        onPress={() => this.setState({selectedTab: 'Message'})}>
                        <Navigation component={Message}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'User'}
                        title="关于"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../img/tabs/contact.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                         source={require("../img/tabs/contact.png")}/>}
                        onPress={() => this.setState({selectedTab: 'User'})}>
                        <Navigation component={About}/>
                    </TabNavigator.Item>
                </TabNavigator>
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
        this.props.loginOut();
        alert('异地登录')
    }

    componentWillMount() {
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
            console.log('alertContent: lalalalalalalalalalalalalalalalalalalalalalalalalalalallalaal' + JSON.stringify(map));
            if (map.content === "loginNotification") {
                this._loginOut()
            }
            console.log('sdaljhfgashdfjkgasdkfjhgsadfkhjagsdfkjhasgdfkasdjhfgasdkfjsga' + map.content.search('message'));
            if (map.content.search('message') == '0') {
                console.log('09090909090909090909090909090909090909090909090909090909');
                this._singleChat(map.content.slice(8, 13), map.content.slice(14, 19), map.content.slice(20, 25))
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
    }
});

const mapStateToProps = (state) => {
    return {
        loginState: state.loginStore
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //判断是否存在TOKEN
       loginOut:()=>{
           dispatch(deleteToken())
       }
    };
};


const TabsContainer = connect(mapStateToProps,mapDispatchToProps)(Tabs);

export default TabsContainer
