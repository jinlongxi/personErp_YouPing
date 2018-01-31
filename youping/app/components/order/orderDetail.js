/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import ButtonMenu from './buttonMenu';
import Util from '../../utils/util';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    InteractionManager,
    Modal,
    DeviceEventEmitter,
    Platform
} from 'react-native';

class orderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: null,
            modalVisible: false,
            orderPayStatus: this.props.selectOrder.orderPayStatus,
            deliveryStatus: this.props.selectOrder.statusId,
            expressInfo: null
        };
    }

    render() {
        const orderData = this.props.selectOrder;
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '订单详情', backType: 'order', refresh: true}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        orderData == null ? Util.loading :
                            <View style={styles.container}>
                                {
                                    orderData.detailImageUrl != null ?
                                        <Image
                                            source={{uri: orderData.detailImageUrl + '?x-oss-process=image/resize,h_667'}}
                                            style={styles.image}
                                            accessibilityLabel="图片加载中。。。"
                                            blurRadius={1}
                                            defaultSource={require('../../img/loading.gif')}
                                        />
                                        : null
                                }
                                <View>
                                    <Text style={styles.title}>订单简介=></Text>
                                    <Text style={styles.text}>资源名称: {orderData.productName}</Text>
                                    <Text style={styles.text}>订单编号: {orderData.orderId}</Text>
                                    <Text style={styles.text}>客户姓名: {orderData.personInfoMap.firstName}</Text>
                                    <Text
                                        style={styles.text}>订单状态: {this.state.deliveryStatus} —— 支付状态:{this.state.orderPayStatus}</Text>
                                    <Text
                                        style={styles.text}>收货地址: {orderData.personAddressInfoMap.contactAddress}</Text>
                                    {
                                        this.state.expressInfo == null ? null :
                                            <Text
                                                style={styles.text}>{this.state.expressInfo}</Text>
                                    }
                                </View>
                            </View>
                    }

                </ScrollView>
                <View style={styles.actionButton}>
                    <ButtonMenu {...this.props}/>
                </View>

            </View>
        )
    }

    componentDidMount() {
        //注意addListener的key和emit的key保持一致
        this.collectionListener = DeviceEventEmitter.addListener('collection', (orderPayStatus) => {
            this.setState({
                orderPayStatus: orderPayStatus,
            })
        });
        this.deliveryListener = DeviceEventEmitter.addListener('delivery', (deliveryStatus) => {
            this.setState({
                deliveryStatus: deliveryStatus,
            })
        });
        this.expressInfoListener = DeviceEventEmitter.addListener('expressInfo', (expressInfo) => {
            console.log(expressInfo);
            this.setState({
                expressInfo: expressInfo,
            })
        });
    }

    componentWillUnmount() {
        //此生命周期内，去掉监听
        this.collectionListener && this.collectionListener.remove();
        this.deliveryListener && this.deliveryListener.remove();
        this.expressInfoListener && this.expressInfoListener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    title: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000D22',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        borderRadius: 2
    },
    placeOrder: {//下单
        backgroundColor: '#3497FF',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    placeOrder_btn: {//下单按钮
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    },
    //多功能按钮
    actionButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: Util.windowSize.width,
        height: Platform.OS === 'android' ? Util.windowSize.height - 70 : Util.windowSize.height - 50,
    }
});

export default orderDetail
