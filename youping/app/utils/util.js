/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import {LineDotsLoader, RotationHoleLoader, CirclesRotationScaleLoader} from 'react-native-indicator';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,       //获取设备的宽高
    ActivityIndicator //相当于Loading加载
} from 'react-native';

var Util = {

    //屏幕尺寸
    windowSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    //开机加载
    bootUp: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CirclesRotationScaleLoader size={50} style={{marginTop: 100}}/>
        <Text style={{textAlign: 'center', marginTop: 5}}>数据加载中</Text>
    </View>,

    //加载动画
    loading: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
        <Text style={{marginTop: 5,fontSize:10}}>正在加载</Text>
    </View>,

};

module.exports = Util;