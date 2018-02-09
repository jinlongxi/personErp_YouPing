/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import MessageList from './messageList';
import Util from '../../utils/util'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class messageView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MessageList {...this.props}/>
        )
    }
}

export default messageView
