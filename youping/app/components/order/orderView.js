/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
//import EmptyView from './EmptyView';
import OrderList from './orderList'
import Util from '../../utils/util'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class orderView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('我的订单列表'+this.props.orderState.isLoading);
        const Loading = this.props.orderState.isLoading;
        return (
            Loading ? <View style={{flex: 1}}>
                {
                    this.props.orderState.orderList.length !== 0 ?
                        <OrderList {...this.props}/>
                        :
                        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><Text
                            style={{textAlign: 'center'}}>还没有卖出去过。。。</Text></View>
                }
            </View> : Util.loading
        )
    }
}

export default orderView