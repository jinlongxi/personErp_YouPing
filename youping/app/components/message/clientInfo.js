/**
 * Created by jinlongxi on 17/11/28.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import Data from './data';
import SingleChat from '../../containers/chatContainer';
import Scanner from '../common/scanner';
import ButtonMenu from '../resource/buttonMenu';
import deviceStorage from '../../utils/deviceStorage';
import ChatWebView   from  './chatWebView';
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
    AlertIOS,
    InteractionManager
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
            dataSource1: ds.cloneWithRows(['row 2']),
            promptValue: null,
            clientData:null
        };
        this._paymentReceived = this._paymentReceived.bind(this);
    }

    _renderRow(item) {
        return (
            item.productPartyRole === '已购买' ? null :
                <View style={styles.item}>
                    <Image
                        source={{uri: item.detailImageUrl+'?x-oss-process=image/resize,m_fill,h_100,w_100'}}
                        style={styles.productImage}
                        defaultSource={require('../../img/loading.gif')}
                    />
                    {/*<TouchableOpacity style={{backgroundColor: '#CAE1FF', padding: 10, borderRadius: 20}}*/}
                                      {/*onPress={this._goChatWebView.bind(this, item)}>*/}
                        {/*<Text style={{color: '#fff'}}>联系买家</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <Text style={{fontSize: 16, width: 82, textAlign: 'center'}}>{item.productPartyRole}</Text>
                </View>
        )
    };

    _renderRowOrder(item) {
        return (
            <View style={styles.item} {...this.props}>
                <Image
                    source={{uri: item.detailImageUrl+'?x-oss-process=image/resize,m_fill,h_100,w_100'}}
                    style={styles.productImage}
                    defaultSource={require('../../img/loading.gif')}
                />
                {/*<TouchableOpacity style={{backgroundColor: '#CAE1FF', padding: 10, borderRadius: 20}}*/}
                                  {/*onPress={this._goChatWebView.bind(this, item)}>*/}
                    {/*<Text style={{color: '#fff'}}>联系买家</Text>*/}
                {/*</TouchableOpacity>*/}
                {
                    item.isConfirmPay !== 'FALSE' ? null :
                        <TouchableOpacity style={{backgroundColor: '#F37B22', padding: 10}}
                                          onPress={()=>this._paymentReceived(item.productId)}
                        >
                            <Text style={{color: '#fff'}}>确认收款</Text>
                        </TouchableOpacity>
                }
                {
                    item.orderStatusCode === '1' ? <Text style={{fontSize: 16}}>交易已完成</Text> :
                        <TouchableOpacity style={{backgroundColor: '#F37B22', padding: 10}}
                                          onPress={()=>this._showDialog(item.orderId)}>
                            <Text style={{color: '#fff'}}>确认发货</Text>
                        </TouchableOpacity>
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

    //点击进入聊天webView
    _goChatWebView() {
        const item =this.state.clientData[0];
        const username = item.payToPartyId;
        const password = item.payToPartyId + '111';
        const payToPartyId = this.props.realPartyId;
        const productId = item.productId;
        const url = "https://www.yo-pe.com/pejump/" + username + '/' + password + "/" + payToPartyId + '/' + productId;
        console.log(url);
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ChatWebView',
                component: ChatWebView,
                params: {
                    url: url
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
    _showDialog(orderId) {
        deviceStorage.save('orderId', orderId);
        AlertIOS.prompt('请输入快递单号', orderId, this.customButtons, 'plain-text')
    }

    //确认发货
    _delivery(promptValue, orderId) {
        this.props.delivery(promptValue, orderId)
    }

    //跳转到聊天页面
    // _singleChat(item) {
    //     const {navigator} = this.props;
    //     if (navigator) {
    //         navigator.push({
    //             name: 'SingleChat',
    //             component: SingleChat,
    //             params: {
    //                 selectResource: this.props.selectResource,
    //                 productId: item.productId,
    //                 productName: item.productName
    //             }
    //         })
    //     }
    // }

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
                <Header initObj={{backName: '返回', barTitle: '客户信息', backType: 'message', refresh: true}}
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
                                        style={styles.position_btn_text}>{this.props.messageState.partyRelation}</Text>
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
                        {
                            this.props.messageState.clientData.length > 0 ?
                                <ListView
                                    dataSource={this.state.dataSource}
                                    renderRow={this._renderRow.bind(this)}
                                    renderSeparator={this._renderSeparator}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                                : null
                        }
                        {
                            this.props.messageState.orderData.length > 0 ?
                                <ListView
                                    dataSource={this.state.dataSource1}
                                    renderRow={this._renderRowOrder.bind(this)}
                                    renderSeparator={this._renderSeparator}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                /> : null
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.moving} onPress={
                            this._goChatWebView.bind(this)
                        }>
                            <Text style={styles.footer_btn_text}>联系买家</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.messageState.clientData),
                dataSource1: ds.cloneWithRows(nextProps.messageState.orderData),
                clientData:nextProps.messageState.clientData
            });
        });
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
    productImage: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
        borderRadius: 3
    },
    btnContainer: {
        padding: 15,
        flexDirection: 'column',
    },
    position: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 230
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
        backgroundColor: 'white',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between'
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
