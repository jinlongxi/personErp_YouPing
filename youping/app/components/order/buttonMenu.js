/**
 * Created by jinlongxi on 17/11/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Scanner from '../common/scanner';
import {
    AlertIOS,
    TextInput,
    Alert,
    Modal,
    DeviceEventEmitter,
    Platform
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
                onPress: this._delivery.bind(this)
            }, {
                text: '取消',
                style: 'cancel',
            }];
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(176,176,176,0.9)" position="left">
                    {
                        this.props.selectOrder.orderPayStatus !== '已确定收款' ?
                            <ActionButton.Item buttonColor='#9b59b6' title="确认收款"
                                               onPress={() => this._paymentReceived.bind(this)()}>
                                <Icon name="logo-usd" style={styles.actionButtonIcon}/>
                            </ActionButton.Item>
                            : <View></View>
                    }
                    {
                        this.props.selectOrder.personAddressInfoMap.contactAddress != undefined && this.props.selectOrder.statusId !== '已发货' ?
                            <ActionButton.Item buttonColor='#3498db' title="确认发货" onPress={() => {
                                this._showDialog.bind(this)()
                            }}>
                                <Icon name="logo-foursquare" style={styles.actionButtonIcon}/>
                            </ActionButton.Item>
                            : <View></View>
                    }
                    <ActionButton.Item buttonColor='#1abc9c' title="联系买家" onPress={() => {
                        this._goChatWebView.bind(this)()
                    }}>
                        <Icon name="ios-at" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    {
                        this.props.selectOrder.statusId === '已发货' ?
                            <ActionButton.Item buttonColor='#1abc9c' title="物流信息" onPress={() => {
                                this._expressInfo.bind(this)()
                            }}>
                                <Icon name="ios-car" style={styles.actionButtonIcon}/>
                            </ActionButton.Item> : <View></View>
                    }
                </ActionButton>
            </View>
        );
    }

    //向父组件传值
    _postMsgByListener = (msg)=> {
        if (msg === 'collection') {
            DeviceEventEmitter.emit('collection', '已确认收款');
        } else if (msg === 'delivery') {
            DeviceEventEmitter.emit('delivery', '已发货');
        }
    };

    //确认已收款
    _paymentReceived() {
        Alert.alert(
            '是否已经收到对方付款?',
            '是否确定',
            [
                {
                    text: '确定', onPress: () => {
                    this.props.paymentReceived(this.props.selectOrder.orderId);
                    this._postMsgByListener('collection')
                }
                },
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }

    //查询物流详细信息
    _expressInfo() {
        const code = this.props.selectOrder.internalCode;
        const ApiCode = '8141fb4bfc2f44b1b21e7397de8c22ff';
        const url = 'http://jisukdcx.market.alicloudapi.com/express/query?number=' + code + '&type=' + 'auto';
        fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": "APPCODE " + ApiCode
            },
            body: '',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            console.log(JSON.stringify(json));
            DeviceEventEmitter.emit('expressInfo', JSON.stringify(json.result.list));
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

    //确认发货
    _delivery(promptValue) {
        this.props.delivery(promptValue, this.props.selectOrder.orderId);
        this._postMsgByListener('delivery')
    }

    //对话框
    _showDialog(orderId) {
        if (Platform.OS === 'android') {
            this._openScanner()
        } else {
            AlertIOS.prompt('请输入快递单号', orderId, this.customButtons, 'plain-text')
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

    //点击进入聊天webView
    _goChatWebView() {
        console.log(this.props.selectOrder);
        const username = this.props.selectOrder.userPartyId;
        const password = this.props.selectOrder.userPartyId + '111';
        const payToPartyId = this.props.selectOrder.realPartyId;
        const productId = this.props.selectOrder.productId;
        const url = "https://www.yo-pe.com/pejump/" + username + '/' + password + "/" + payToPartyId + '/' + productId + '/NA';
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ChatWebView',
                component: ChatWebView,
                params: {
                    url: url,
                    productId: productId,
                    payToPartyId: payToPartyId
                }
            })
        }
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
