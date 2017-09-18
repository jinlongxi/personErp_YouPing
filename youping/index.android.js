/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Login from './app/login/login';
import Navigator from './app/common/navigation'
import DeviceStorage from './app/common/deviceStorage'
import Home from './app/home/homoList'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} from 'react-native';

class youping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tarjeta: ''
    };
    DeviceStorage.get('tarjeta').then((tags) => {
      this.setState({
        tarjeta: tags
      })
    });
  }

  render() {
    return (
        <Navigator
            component={this.state.tarjeta == '' ?Login:Home}
        />
    )
  }

  componentDidMount() {
    console.log('当前Token:'+this.state.tarjeta)
  }
}

AppRegistry.registerComponent('youping', () => youping);
