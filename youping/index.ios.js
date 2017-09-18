/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Login from './app/login/login';
import Navigator from './app/common/navigation'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView
} from 'react-native';


class youping extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Navigator component={Login}/>
        )
    }
}

AppRegistry.registerComponent('youping', () => youping);
