/**
 * Created by jinlongxi on 17/12/25.
 */
/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    WebView
} from 'react-native';

var customerWebView = React.createClass({
    render: function () {
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                <Header
                    navigator={this.props.navigator}
                    initObj={{
                        backName:'返回',
                        barTitle:'单聊页面'
                    }}
                />
                <WebView
                    startInLoadingState={true}
                    source={{url:this.props.url}}
                />
            </View>
        )
    },
});
module.exports = customerWebView;
