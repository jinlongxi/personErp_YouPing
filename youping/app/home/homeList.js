/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import NavigationBar from './navigationBar';
import MyResourceList from '../resource/myResourceList';
import OtherResourceList from '../resource/otherResourceList'
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
                    <Text>我的资源</Text>
                    <MyResourceList handleVal={this.handleVal} {...this.props}/>
                </View>
                <View style={styles.navigationBar}>
                    <NavigationBar productCategoryId={this.state.productCategoryId} {...this.props}/>
                </View>
                <View style={styles.otherResource}>
                    <Text>好友资源</Text>
                    <OtherResourceList {...this.props}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    myResource: {
        borderWidth: 1,
        borderColor: '#1d1d1d',
        height: 250,
        margin: 10,
        paddingTop:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationBar: {
        height: 80,
        margin: 10
    }, otherResource: {
        borderWidth: 1,
        borderColor: '#1d1d1d',
        height: 250,
        margin: 10,
        paddingTop:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default homeList
