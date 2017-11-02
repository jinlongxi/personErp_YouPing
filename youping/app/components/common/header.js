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
    TouchableOpacity
} from 'react-native';

var Icon = require('./left_icon');

var Header = React.createClass({
    render: function () {
        //获取对象  按钮名称   头部Title
        var headContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.left_btn} onPress={this._pop}>
                    <Icon/>
                    <Text style={styles.btn_text}>{headContent.backName}</Text>
                </TouchableOpacity>
                <View style={styles.title_container}>
                    <Text style={styles.title} numberOfLines={1}>{headContent.barTitle}</Text>
                </View>
            </View>
        )
    },
    //返回按钮的事件处理器
    _pop: function () {
        this.props.navigator.pop();
    }
});

var styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "#3497FF",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
    },
    left_btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    title_container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft:90
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18,
    }
});

module.exports = Header;
