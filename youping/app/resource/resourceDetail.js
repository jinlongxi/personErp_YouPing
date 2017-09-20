/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import ServiceURl from '../common/service';
import Request from  '../common/request';
import Header from '../common/header';
import OrderList from '../order/orderList';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';

class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceData: null,
            resourceType: this.props.resourceType
        };
        this._buyResource = this._buyResource.bind(this)
    }

    //请求数据
    _getData() {
        let that = this;
        let url = ServiceURl.personManager + 'queryResourceDetail';
        let data = '&productId=' + this.props.productId;
        console.log(url + data);
        Request.postRequest(url, data, function (success) {
            let {resourceDetail:resourceDetail}=success;
            that.setState({
                resourceData: resourceDetail,
            });
            console.log("资源详情:" + JSON.stringify(success))
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    }

    //购买资源
    _buyResource() {
        let url = ServiceURl.personManager + 'placeResourceOrder';
        const that = this;
        let data = '&productId=' + this.state.resourceData.productId + '&productStoreId=' + this.state.resourceData.productStoreId
            + '&prodCatalogId='
            + this.state.resourceData.prodCatalogId + '&payToPartyId=' + this.state.resourceData.payToPartyId;
        console.log('购买资源URL:' + url + data);
        Request.postRequest(url, data, function (success) {
            let {code:code}=success;
            if (code === '200') {
                console.log("购买资源:" + JSON.stringify(success));
                const {navigator} = that.props;
                if (navigator) {
                    navigator.push({
                        name: 'OrderList',
                        component: OrderList,
                        params: {},
                    })
                }
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    }

    render() {
        var resource = this.props.resource;
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '资源详情'}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        this.state.resourceData == null ? null :
                            <View style={styles.container}>
                                {
                                    this.state.resourceData.detailImageUrl != null ?
                                        <Image source={{uri: this.state.resourceData.detailImageUrl}}
                                               style={styles.image}/>
                                        : null
                                }
                                <Text style={styles.title}>资源简介:{this.state.resourceData.productName}</Text>
                                <Text style={styles.text}>资源编号:{this.state.resourceData.productId}</Text>
                                <Text style={styles.title}>发布者</Text>
                                <Text style={styles.text}>{this.state.resourceData.firstName}</Text>
                            </View>

                    }
                </ScrollView>
                <View >
                    {
                        this.state.resourceType !== 'my' ?
                            <TouchableOpacity style={styles.placeOrder} onPress={this._buyResource}>
                                <Text style={styles.placeOrder_btn}
                                >联系购买</Text>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>
        )
    }

    componentWillMount() {
        this._getData();
        console.log(this.props.resourceType + "带来的参数")
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
        alignItems: 'center'
    },
    placeOrder: {//下单
        backgroundColor: 'blue',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeOrder_btn: {//下单按钮
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    }
});

export default ResourceDetail
