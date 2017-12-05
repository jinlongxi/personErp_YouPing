/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import ButtonMenu from '../message/buttonMenu';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';

class orderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: null
        }
    }

    render() {
        const orderData = this.state.orderData;
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '订单详情', backType: 'order', refresh: true}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        orderData == null ? null :
                            <View style={styles.container}>
                                {
                                    orderData.detailImageUrl != null ?
                                        <Image source={{uri: orderData.detailImageUrl}}
                                               style={styles.image}
                                               accessibilityLabel="图片加载中。。。"
                                               blurRadius={1}
                                               defaultSource={require('../../img/loading.gif')}
                                        />
                                        : null
                                }
                                <Text style={styles.title}>订单简介:{orderData.productName}</Text>
                                <Text style={styles.text}>订单编号:{orderData.orderId}</Text>
                                <Text style={styles.text}>订单状态:{orderData.statusId}</Text>
                                <Text style={styles.text}>是否收款:{orderData.orderPayStatus}</Text>
                                <Text style={styles.text}>购买人:{orderData.personInfoMap.firstName}</Text>
                                <Text style={styles.text}>收货地址:{orderData.personAddressInfoMap.contactAddress}</Text>
                            </View>
                    }
                </ScrollView>
                <ButtonMenu orderData={orderData} {...this.props}/>
            </View>
        )
    }

    componentWillMount() {
        console.log(this.props);
        const orderList = this.props.orderState.orderList;
        const selectOrder = orderList.filter((item)=> {
            if (item.orderId === this.props.orderId) {
                return item
            }
        });
        //请求订单详情数据
        this.setState({
            orderData: selectOrder[0]
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // const orderList = nextProps.orderState.orderList;
        // const selectOrder = orderList.filter((item)=> {
        //     if (item.productId === nextProps.productId) {
        //         return item
        //     }
        // });
        // //请求订单详情数据
        // this.setState({
        //     orderData: selectOrder[0]
        // })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
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
        borderWidth: 1,
        borderColor: 'gray'
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
});

export default orderDetail
