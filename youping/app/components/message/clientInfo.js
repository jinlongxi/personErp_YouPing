/**
 * Created by jinlongxi on 17/11/28.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import Data from './data';
import SingleChat from '../../containers/chatContainer';
import Scanner from '../common/scanner';
import ButtonMenu from '../message/buttonMenu';
;
import deviceStorage from '../../utils/deviceStorage';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView,
    Alert,
    Switch,
    ListView,
    KeyboardAvoidingView,
    BackHandler,
    Platform,
    Keyboard,
    AlertIOS
} from 'react-native';
class Reservoir extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
        this.state = {
            selectBtn: 1,
            text: '',
            dataSource: ds.cloneWithRows(['row 1']),
            dataSource1: ds.cloneWithRows(['row 1']),
            promptValue: null
        };
        this._paymentReceived = this._paymentReceived.bind(this);
    }

    _renderRow(item) {
        return (
            <View style={styles.item} {...this.props}>
                {
                    item.productPartyRole === '已购买' ? null :
                        <View style={styles.item}>
                            <Text style={[{flex: 1,}, styles.txt,]}>{item.productName}</Text>
                            <Text style={{fontSize: 16}}>{item.productPartyRole}</Text>
                        </View>
                }
            </View>
        )
    };

    _renderRowOrder(item) {
        return (
            <View style={styles.item} {...this.props}>
                {
                    <View style={styles.item}>
                        <Text style={[{flex: 1,}, styles.txt,]}>{item.productName}</Text>
                        {
                            item.isConfirmPay !== 'FALSE' ? null :
                                <TouchableOpacity style={{backgroundColor: '#F37B22', padding: 10, marginRight: 10}}
                                                  onPress={()=>this._paymentReceived(item.productId)}
                                >
                                    <Text style={{color: '#fff'}}>确认收款</Text>
                                </TouchableOpacity>
                        }
                        {
                            item.orderStatusCode === '1' ?  <Text style={{fontSize:16}}>交易已完成</Text> :
                                <TouchableOpacity style={{backgroundColor: '#F37B22', padding: 10}}
                                                  onPress={()=>this._showDialog(item.orderId)}>
                                    <Text style={{color: '#fff'}}>确认发货</Text>
                                </TouchableOpacity>
                        }
                    </View>
                }
            </View>
        )
    };

    //确认收款
    _paymentReceived(productId) {
        Alert.alert(
            '是否已经收到对方付款？',
            '是否确定',
            [
                {
                    text: '确定',
                    onPress: () => this.props.paymentReceived(productId, this.props.selectResource.user.realPartyId)
                },
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )

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
    _showDialog(orderId) {
        deviceStorage.save('orderId', orderId)
        AlertIOS.prompt('请输入快递单号', orderId, this.customButtons, 'plain-text')
    }

    //确认发货
    _delivery(promptValue, orderId) {
        this.props.delivery(promptValue, orderId)
    }

    //跳转到聊天页面
    _singleChat() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'SingleChat',
                component: SingleChat,
                params: {
                    selectResource: this.props.selectResource
                }
            })
        }
    }

    _renderSeparator(sectionID, rowID) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: 0.8,
                    backgroundColor: '#ddd',
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header initObj={{backName: '返回', barTitle: '单聊页面', backType: 'message', refresh: true}}
                        navigator={this.props.navigator}
                />
                <View style={styles.main}>
                    <View style={styles.form}>
                        <View style={styles.left_image}>
                            <Image style={styles.image} source={{uri: this.props.selectResource.user.avatar}}/>
                            <Text style={{padding: 2}}>{this.props.selectResource.user.name}</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <View style={styles.position}>
                                <TouchableOpacity
                                    style={[styles.position_btn, {backgroundColor: this.state.selectBtn === 1 ? '#F37B22' : '#cccccc'}]}
                                    onPress={()=> {
                                        this.setState({
                                            selectBtn: 1,
                                        })
                                    }}>
                                    <Text style={styles.position_btn_text}>客户关系:</Text>
                                    <Text
                                        style={styles.position_btn_text}>潜在客户</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.position}>
                                <TouchableOpacity
                                    style={[styles.position_btn, {backgroundColor: this.state.selectBtn === 2 ? '#F37B22' : '#cccccc'}]}
                                    onPress={()=> {
                                        this.setState({
                                            selectBtn: 2,
                                        })
                                    }}>
                                    <Text style={styles.position_btn_text}>交易次数</Text>
                                    <Text
                                        style={styles.position_btn_text}>共0次</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                            renderSeparator={this._renderSeparator}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <ListView
                            dataSource={this.state.dataSource1}
                            renderRow={this._renderRowOrder.bind(this)}
                            renderSeparator={this._renderSeparator}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.moving} onPress={this._singleChat.bind(this)}>
                        <Text style={styles.footer_btn_text}>聊天</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // componentWillMount() {
    //     console.log(this.props);
    //     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.setState({
    //         dataSource: ds.cloneWithRows(this.props.messageState.clientData)
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.messageState.clientData),
            dataSource1: ds.cloneWithRows(nextProps.messageState.orderData)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7a7a7a'
    },
    main: {
        flex: 1
    },
    form: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 10
    },
    left_image: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 40,
    },
    btnContainer: {
        padding: 10,
        flexDirection: 'column',
    },
    position: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 210
    },
    position_btn: {
        flex: 1,
        margin: 5,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    position_btn_text: {
        fontSize: 13,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#fff'
    },

    list: {
        margin: 10,
        backgroundColor: '#ffffff'
    },
    txt: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 18,
    },
    item: {
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        width: Util.windowSize.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptying: {
        flex: 1,
        backgroundColor: '#cccccc'
    },
    moving: {
        flex: 1,
        backgroundColor: '#28a745'
    },
    footer_btn_text: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
});

export default Reservoir
