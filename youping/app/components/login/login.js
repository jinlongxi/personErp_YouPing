/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ParallaxView from 'react-native-parallax-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView,
    Alert,
    PixelRatio
} from 'react-native';

const Login = ({ weChatLogin})=> {
    return (
        <ParallaxView
            backgroundSource={require('../../img/login/jianjie.jpg')}
            windowHeight={300}
            scrollableViewStyle={{backgroundColor: 'white'}}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnWechat} onPress={()=>{weChatLogin()}}>
                    <Image
                        source={require('../../img/login/wechat.jpg')}
                        style={styles.icon}/>
                    <Text style={styles.btn}>微信登录</Text>
                </TouchableOpacity>
            </View>
        </ParallaxView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnWechat: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3
    },
    btnTel: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 44
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 5
    },


});

export default Login
