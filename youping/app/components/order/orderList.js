/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import OrderItem from './orderItem';
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import Header from '../../containers/commonContainer/headerContainer';
import orderDetailContainer from '../../containers/order/orderDetailContainer';
import HeaderTab from './headerTab';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    ScrollView
} from 'react-native';

class orderList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        const {loading}=this.props.orderListStore;
        return (
            <View style={styles.container}>
                <Header initObj={{backName: '', barTitle: '订单列表'}}/>
                <HeaderTab {...this.props}/>
                {
                    loading ? Util.loading : this._renderList()
                }
            </View>
        );
    }

    //渲染列表
    _renderList() {
        const {orderListData}=this.props.orderListStore;
        return (
            orderListData.length > 1 ? <ListView
                dataSource={this.state.dataSource}
                initialListSize={10}    //设置显示条数
                renderRow={this._renderRow}
                renderSeparator={this._renderSeparator}
                contentContainerStyle={styles.listStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            /> : <View
                style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><Text
                style={{textAlign: 'center'}}>没有相关数据。。。</Text></View>
        )
    }

    //渲染行
    _renderRow(resource) {
        return !this.state.empty ?
            <OrderItem resource={resource} onPress={()=> {
                this._showDetail.bind(this, resource)()
            }}/> : <EmptyPage/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth
        };
        return <View style={style} key={sectionID + rowID}/>
    }

    //点击进入订单详情页面
    _showDetail(order) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'orderDetailContainer',
                component: orderDetailContainer,
                params: {
                    orderId: order.orderId
                }
            })
        }
    }

    componentWillMount() {
        const {orderListActions}=this.props;
        orderListActions.requestOrderList('ALL')
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const {orderListData}=nextProps.orderListStore;
        this.setState({
            dataSource: ds.cloneWithRows(orderListData),
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default orderList
