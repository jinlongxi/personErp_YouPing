/**
 * Created by jinlongxi on 18/2/8.
 */
import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import ResourceList from './../../containers/resource/resourceListContainer';
import Order from './../../containers/order/orderListContainer';
import Message from './../../containers/message/messageContainer';
import About from './../../containers/about/aboutContainer';
import Navigation from '../../utils/navigation';
import JPushModule from 'jpush-react-native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image,
    Platform
} from 'react-native'

class TabView extends Component {
    render() {
        let tabBarHeight;
        const {isHidden, selectedTab}=this.props.tabStore;
        isHidden ? tabBarHeight = 0 : tabBarHeight = 50;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{height: tabBarHeight, overflow: 'hidden'}}
                    sceneStyle={{paddingBottom: tabBarHeight}}
                >
                    <TabNavigator.Item
                        selected={selectedTab === 'Event'}
                        title="资源"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('../../img/tabs/home.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#1e90ff'}]}
                                                         source={require("../../img/tabs/home.png")}/>}
                        onPress={() => this._switchTab('Event')}>
                        <Navigation component={ResourceList}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'Order'}
                        title="订单"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../img/tabs/manager.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#1e90ff'}]}
                                                         source={require("../../img/tabs/manager.png")}/>}
                        onPress={() => this._switchTab('Order')}>
                        <Navigation component={Order}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'Message'}
                        title="消息"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../img/tabs/message.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#1e90ff'}]}
                                                         source={require("../../img/tabs/message.png")}/>}
                        onPress={() => this._switchTab('Message')}>
                        <Navigation component={Message}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'About'}
                        title="我"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../img/tabs/contact.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: '#1e90ff'}]}
                                                         source={require("../../img/tabs/contact.png")}/>}
                        onPress={() => this._switchTab('About')}>
                        <Navigation component={About}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }

    //切换tab
    _switchTab(selectedTab) {
        const {tabActions}=this.props;
        tabActions.switchTabBar(selectedTab)
    }

    //保存registration到后台
    _postRegistrationId(registrationId) {
        const {tabActions}=this.props;
        tabActions.requestSaveRegistrationId(registrationId);
    }

    //监听极光推送
    _watchJPush() {
        //获取registrationId
        JPushModule.getRegistrationID((registrationId) => {
            this._postRegistrationId(registrationId)
        });
        if (Platform.OS === 'android') {
            JPushModule.initPush();
            JPushModule.notifyJSDidLoad((resultCode) => {
                console.log(JSON.stringify(resultCode))
            });
            JPushModule.notifyJSDidLoad((resultCode) => {

            });
            JPushModule.addReceiveCustomMsgListener((map) => {
                console.log('接受到的推送内容:' + JSON.stringify(map));
                //挤掉当前用户
                if (map.message === "loginNotification") {
                    const {loginActions}=this.props;
                    loginActions.weChatLoginOut();
                } else if (map.message === "message") {
                    alert('有新的消息注意查收')
                } else if (map.message === "order") {
                    alert('有新的订单注意查收')
                }
            });
            JPushModule.addReceiveNotificationListener((map) => {
                console.log("显示在手机的消息" + JSON.stringify(map));
            });
        } else {
            //清楚徽章
            JPushModule.setBadge(0, (success) => {
            });
            //接收消息
            JPushModule.addReceiveNotificationListener((map) => {
                console.log("显示在手机的消息" + JSON.stringify(map));
            });
            //接受通知
            JPushModule.addReceiveCustomMsgListener((map) => {
                console.log('接受到的推送内容:' + JSON.stringify(map));
                //挤掉当前用户
                if (map.content === "loginNotification") {
                    this._loginOut()
                } else if (map.content === "message") {
                    const {messageActions}=this.props;
                    messageActions.requestMessageList();
                } else if (map.content === "order") {
                    this._updateOrderList()
                }
            });
        }
    }

    componentDidMount() {
        // const that = this;
        // setTimeout(function () {
        //     //监听推送消息
        //     that._watchJPush()
        // }, 5000)
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
        color: '#1e90ff'
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

export default TabView
