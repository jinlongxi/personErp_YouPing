/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeciveStorage from '../utils/deviceStorage';
import TabNavigator from 'react-native-tab-navigator';
import Resource from './ResourceContainer';
import Order from '../components/order/orderList';
import About from '../components/about/aboutList';
import Navigation from '../utils/navigation';
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

    // componentWillMount() {
    //     //这个是为了测试用的，不用的时候注释掉
    //     DeciveStorage.save('tarjeta', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZSIsImRlbGVnYXRvck5hbWUiOiJkZWZhdWx0IiwiZXhwIjoxNTEwODg1MjcwLCJ1c2VyIjoiMTAwMzAiLCJpYXQiOjE1MDk1ODkyNzB9.8aQzBKetH0tcx71x3F1fkHSn2iCMO3eUyirE8Pr4m-U');
    // }
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


const TabsContainer = connect()(Tabs);

export default TabsContainer
