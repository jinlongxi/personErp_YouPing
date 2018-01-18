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
        const Loading = this.props.messageState.isLoading;
        return (
            Loading ?
                this.props.messageState.messageList.length > 0 ?
                    <MessageList {...this.props}/> :
                    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                        <Text style={{textAlign: 'center'}}>客户还在路上。。。</Text>
                    </View>
                : Util.loading
        )
    }

    componentWillMount() {
        this.props.getMessageList();
    }
}

export default messageView
