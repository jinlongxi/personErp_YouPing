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

    //向父组件传值
    _postMsgByListener = (msg)=> {
        if(msg==='collection'){
            DeviceEventEmitter.emit('collection', '已确认收款');
        }else if(msg==='delivery'){
            DeviceEventEmitter.emit('delivery', '已发货');
        }
    };

    barcodeReceived(e) {
        if (this.state.break) {
            Alert.alert(
                '快递单号',
                e.data,
                [
                    {
                        text: '确定发货', onPress: () => {
                        this.props.navigator.pop();
                        this.props.delivery(e.data,this.props.selectOrder.orderId);
                        this._postMsgByListener('delivery')
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