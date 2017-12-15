/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Platform
} from 'react-native';

var Icon = require('./left_icon');

var Header = React.createClass({
    render: function () {
        //获取对象  按钮名称   头部Title
        var headContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <TouchableOpacity style={styles.left_btn} onPress={this._pop}>
                        <Icon/>
                        <Text style={styles.btn_text}>{headContent.backName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title} numberOfLines={1}>{headContent.barTitle}</Text>
                </View>
            </View>
        )
    },
    //返回按钮的事件处理器
    _pop: function () {
        //刷新之前的页面
        if (this.props.initObj.backType === 'message') {
            this.props.getMessageList();
            this.props.navigator.popToTop();
        } else if (this.props.initObj.backType === 'resource') {
            this.props.getResourceList();
            this.props.navigator.pop();
        } else if (this.props.initObj.backType === 'order') {
            this.props.getOrderList();
            this.props.navigator.pop();
        }else{
            this.props.navigator.pop();
        }
        //是否显示TABBAR
        if (this.props.initObj.refresh) {
            this.props.showTab()
        }
    }
});

var styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "#3A5FCD",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS==='ios'?15:0
    },
    left_btn: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0
    },
    btn_text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',

    },
    title_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18,
        textAlign: 'center',
    }
});

module.exports = Header;
