/**
 * Created by jinlongxi on 17/11/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import {QRScannerView} from 'ac-qrcode';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            break: true
        }
    }

    render() {
        return (
            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }

    _renderTitleBar() {
        return (
            <Text
                style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontSize: 20, padding: 12}}
            >这里添加标题</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontSize: 20, padding: 12}}
            >这里添加底部菜单</Text>
        )
    }

    barcodeReceived(e) {
        const {orderDetailActions, orderId}=this.props;

        if (this.state.break) {
            Alert.alert(
                '快递单号',
                e.data,
                [
                    {
                        text: '确定发货', onPress: () => {
                        this.props.navigator.pop();
                        orderDetailActions.fetchLogistics(e.data, orderId);
                    }
                    },
                    {
                        text: '取消', onPress: () => {
                        this.setState({
                            break: true
                        });
                        this.props.navigator.pop();
                    }
                    },
                ],
                {cancelable: false}
            );
            this.setState({
                break: false
            })
        }
    }

}

export default Scanner