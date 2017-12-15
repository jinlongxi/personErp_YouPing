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


class HeaderBar extends React.Component {
    render() {
        //获取对象  按钮名称   头部Title
        var headContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <Text style={styles.title} numberOfLines={1}>{headContent.barTitle}</Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "#3A5FCD",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:  Platform.OS==='ios'?15:0,
    },
    btn_text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    title_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18,
    }
});

export default HeaderBar;
