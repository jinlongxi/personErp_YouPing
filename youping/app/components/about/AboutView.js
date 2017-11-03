/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Util from '../../utils/util';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';

const AccountList = ({aboutState})=> {
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    aboutState.isLoading ?
                        <View style={styles.accountInfo}>
                            <View style={styles.image}>
                                <Image source={{uri: aboutState.myInfo.headPortrait}}
                                       style={styles.image1}
                                       accessibilityLabel="图片加载中。。。"
                                       blurRadius={1}
                                       defaultSource={require('../../img/loading.gif')}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>姓名:{aboutState.myInfo.personName}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>电话:{aboutState.myInfo.contactNumber}</Text>
                            </View>
                            <TouchableOpacity style={styles.loginOut}>
                                <Text style={styles.text}>退出登录</Text>
                            </TouchableOpacity>
                        </View>
                        : Util.loading
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    },
    accountInfo: {
        justifyContent: 'center',
    },
    image: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        height: 150,
        width: 150,
        borderWidth: 1,
        borderColor: '#1d1d1d',
        borderRadius: 75
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    text: {
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40
    },
    loginOut: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EE6A50',
        margin: 20
    },
    loginOutText: {
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40,
        color: '#f0f0f0'
    }
});

export default AccountList
