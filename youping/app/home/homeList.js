/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import NavigationBar from './navigationBar';
import MyResourceList from '../resource/myResourceList';
import OtherResourceList from '../resource/otherResourceList';
import Geolocation from 'Geolocation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    DeviceEventEmitter
} from 'react-native';

class homeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productCategoryId: null,
            resource: null
        }
    }

    //定义子组件传来的参数
    handleVal(event) {
        this.setState({productCategoryId: event.target.value});
    }

    //渲染页面
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.myResource}>
                    <Text style={styles.title}>我的资源</Text>
                    <MyResourceList handleVal={this.handleVal} {...this.props}/>
                </View>
                <View style={styles.navigationBar}>
                    <NavigationBar productCategoryId={this.state.productCategoryId} {...this.props}/>
                </View>
                <View style={styles.otherResource}>
                    <Text style={styles.title}>好友资源</Text>
                    <OtherResourceList {...this.props}/>
                </View>
            </View>
        );
    }

    //获取地理位置
    _getLocation() {
        Geolocation.getCurrentPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                console.log(result);
            },
            error => {
                alert("获取位置失败：" + error)
            }
        );
    }

    componentDidMount() {
        //this._getLocation()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    myResource: {
        borderWidth: 1,
        borderColor: '#1d1d1d',
        height: 250,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
    },
    navigationBar: {
        height: 60,
        margin: 10
    },
    otherResource: {
        borderWidth: 1,
        borderColor: '#1d1d1d',
        height: 250,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center'
    }
});

export default homeList
