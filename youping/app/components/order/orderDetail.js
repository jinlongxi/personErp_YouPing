/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../common/header';
import SectionViewList from '../common/sectionList';
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
            orderData: null,
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '订单详情'}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        this.state.orderData == null ? null :
                            <View style={styles.container}>
                                {
                                    this.state.orderData.detailImageUrl != null ?
                                        <Image source={{uri: this.state.orderData.detailImageUrl}}
                                               style={styles.image}
                                               accessibilityLabel="图片加载中。。。"
                                               blurRadius={1}
                                               defaultSource={require('../../img/loading.gif')}
                                        />
                                        : null
                                }
                                <Text style={styles.title}>订单简介:{this.state.orderData.productName}</Text>
                                <Text style={styles.text}>订单编号:{this.state.orderData.orderId}</Text>
                                <Text style={styles.text}>购买人:{this.state.orderData.personInfoMap.firstName}</Text>
                            </View>
                    }
                </ScrollView>
                <TouchableOpacity style={styles.cencelOrder} onPress={()=> {}}>
                    <Text style={styles.placeOrder_btn}
                    >与买家交谈</Text>
                </TouchableOpacity>
            </View>
        )
    }

    componentWillMount() {
        this.setState({
            orderData: this.props.selectOrder
        })
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
    cencelOrder: {
        backgroundColor: '#90EE90',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    }
});

export default orderDetail
