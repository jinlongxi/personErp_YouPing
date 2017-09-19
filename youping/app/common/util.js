/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
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

    //基于fetch的get/post请求   只负责获取数据  具体处理  在回调中操作
    getRequest:function(url,successCallback,failCallback){
        fetch(url)
            .then((response)=>response.json())
            .then((responseData)=>successCallback(responseData))
            .catch((error)=>failCallback(error))
    },

    //加载效果
    loading:<ActivityIndicator style={{marginTop:200}}/>
};

module.exports=Util;