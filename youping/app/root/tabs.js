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
import Search from '../search/search'
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
                                <View style={styles.page1}>
                                    <Text style={{fontSize: 18, padding: 15}}>管理页面</Text>
                                </View>
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

    componentDidMount() {
        // console.log('传递过来的TOKEN:'+this.props.tarjeta);
        // this.setState({
        //     tarjeta:this.props.tarjeta
        // });
        DeviceStorage.get('tarjeta').then((tags) => {
            this.setState({
                tarjeta: tags
            })
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
        backgroundColor: 'blue'
    }
});

export default Tabs
