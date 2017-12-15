/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import DeviceStorage from './deviceStorage';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,       //获取设备的宽高
    ActivityIndicator //相当于Loading加载
} from 'react-native';

const Request = {

    //基于fetch的get/post请求   只负责获取数据  具体处理  在回调中操作
    postRequest: function (url, data, successCallback, failCallback) {
        DeviceStorage.get('tarjeta').then((tarjeta) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "tarjeta=" + tarjeta + data
            })
                .then((response)=>response.json())
                .then((responseData)=>successCallback(responseData))
                .catch((error)=>failCallback(error))
        });
    },
    //快速实现
    postRequestF: function (url, tarjeta, successCallback, failCallback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "tarjeta=" + tarjeta
        })
            .then((response)=>response.json())
            .then((responseData)=>successCallback(responseData))
            .catch((error)=>failCallback(error))
    },
    //不需要token的请求
    postRequestLogin: function (url, data, successCallback, failCallback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data
        })
            .then((response)=>response.json())
            .then((responseData)=>successCallback(responseData))
            .catch((error)=>failCallback(error))
    },
    //上传图片
    uploadImage: function (url, data, successCallback, failCallback) {
        let formData = new FormData();      //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
        for (var i = 0; i < data.length; i++) {
            let file = {uri: data[i].uri, type: 'multipart/form-data', name: 'a.jpg'};   //这里的key(uri和type和name)不能改变,
            formData.append("images", file);   //这里的files就是后台需要的key
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response)=>response.json())
            .then((responseData)=>successCallback(responseData))
            .catch((error)=>failCallback(error))
    }

};

export default Request
