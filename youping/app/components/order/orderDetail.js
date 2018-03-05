/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/commonContainer/headerContainer';
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
    }

    render() {
        const {orderDetailData, loading}=this.props.orderDetailStore;
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '订单详情', backType: 'order', hiddenTab: true}}
                    navigator={this.props.navigator}
                />
                {
                    loading ? Util.loading :
                        <View style={{flex: 1}}>
                            {
                                orderDetailData != null ?
                                    <View style={styles.container}>
                                        <ScrollView>
                                            <Image
                                                source={{uri: orderDetailData.detailImageUrl + '?x-oss-process=image/resize,h_667'}}
                                                style={styles.image}
                                                accessibilityLabel="图片加载中。。。"
                                                blurRadius={1}
                                                defaultSource={require('../../img/loading.gif')}
                                            />
                                            <Text style={styles.title}>订单简介=></Text>
                                            <Text style={styles.text}>资源名称: {orderDetailData.itemDescription}</Text>
                                            <Text
                                                style={styles.text}>客户姓名: {orderDetailData.personInfoMap.firstName}</Text>
                                            <Text
                                                style={styles.text}>下单时间: {`${orderDetailData.orderDate.month}月${orderDetailData.orderDate.date}日${orderDetailData.orderDate.hours}时${orderDetailData.orderDate.seconds}分`}</Text>
                                            <Text style={styles.text}>订单编号: {orderDetailData.orderId}</Text>
                                            <Text style={styles.text}>支付状态: {orderDetailData.orderPayStatus}</Text>
                                            <Text style={styles.text}>发货状态: {orderDetailData.orderShipment}</Text>
                                            <Text style={styles.text}>收货地址: {orderDetailData.personAddressInfoMap.address}</Text>
                                            {/*{*/}
                                            {/*this.state.expressInfo == null ? null :*/}
                                            {/*<Text*/}
                                            {/*style={styles.text}>{this.state.expressInfo}</Text>*/}
                                            {/*}*/}
                                        </ScrollView>
                                        <View style={styles.actionButton}>
                                            <ButtonMenu {...this.props}/>
                                        </View>
                                    </View>
                                    : null
                            }
                        </View>
                }
            </View>
        )
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            const {orderDetailActions, orderId} =this.props;
            orderDetailActions.requestOrderDetail(orderId)
        });
    }

    componentWillUnmount() {
        const {orderDetailActions}=this.props;
        orderDetailActions.clearOrderDetail()
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
        color: '#000D22',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 14
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
