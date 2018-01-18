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
        this.state = {
            loading: false,
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <OrderList {...this.props}/>
            </View>
        )
    }

    componentWillMount() {
        this.props.getOrderList('ALL');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.orderState);
        this.setState({
            loading: nextProps.orderState.isLoading,
        })
    }
}

export default orderView
