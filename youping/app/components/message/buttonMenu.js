/**
 * Created by jinlongxi on 17/11/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SingleChat from '../../containers/chatContainer';
import Scanner from '../common/scanner';
import {
    AlertIOS,
    TextInput,
    Alert
} from 'react-native'
class ButtonMenu extends Component {
    constructor(props) {
        super(props);
        this.customButtons = [
            {
                text: '扫描条形码',
                onPress: this._openScanner.bind(this)
            }, {
                text: '提交',
                onPress: this.saveResponse.bind(this)
            }, {
                text: '取消',
                style: 'cancel',
            }];
        this.state = {
            promptValue: null
        };
    }

    render() {
        console.log(this.props);
        return (
            <View style={{flex: 1,}}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="确认收款"
                                       onPress={() => this._paymentReceived.bind(this)()}>
                        <Icon name="logo-usd" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="确认发货" onPress={() => {
                        this._showDialog.bind(this)()
                    }}>
                        <Icon name="logo-foursquare" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="联系买家" onPress={() => {
                        this._singleChat.bind(this)()
                    }}>
                        <Icon name="ios-at" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }

    //确认已收款
    _paymentReceived(){
        Alert.alert(
            '是否已经收到对方付款？',
            '是否确定',
            [
                {text: '确定', onPress: () => this.props.paymentReceived(this.props.orderData.orderId)},
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    //跳转到聊天页面
    _singleChat() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'SingleChat',
                component: SingleChat,
                params: {
                    selectResource: this.props.orderData
                }
            })
        }
    }

    //打开扫描仪
    _openScanner() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Scanner',
                component: Scanner,
                params: {
                    ...this.props
                }
            })
        }
    }

    //对话框
    _showDialog() {
        AlertIOS.prompt('请输入快递单号', '152829145573', this.customButtons, 'plain-text')
    }

    //确认发货
    saveResponse(promptValue) {
        this.props.delivery(promptValue, this.props.orderData.orderId)
    }

}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ButtonMenu;