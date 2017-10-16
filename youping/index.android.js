/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import ROOT from './app/root/tabs'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    Image
} from 'react-native';


class youping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Event'
    }
  }

  render() {
    return (
        <ROOT/>
    );
  }
}

AppRegistry.registerComponent('youping', () => youping);
