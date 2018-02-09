/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tabCreators from '../../actions/tab/tabAction';
import * as loginCreators from '../../actions/login/loginAction';
import * as messageCreators from '../../actions/message/messageAction';
import * as orderCreators from '../../actions/order';
import TabView from '../../components/tab/tabView';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image,
    Platform
} from 'react-native'
const mapStateToProps = (state) => {
    const {tabStore}=state;
    return {
        tabStore
    }
};
const mapDispatchToProps = (dispatch) => {
    const tabActions = bindActionCreators(tabCreators, dispatch);
    const loginActions = bindActionCreators(loginCreators, dispatch);
    const messageActions = bindActionCreators(messageCreators, dispatch);
    const orderActions = bindActionCreators(orderCreators, dispatch);
    return {
        tabActions,
        loginActions,
        messageActions,
        orderActions
    };
};
const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(TabView);
export default TabsContainer
