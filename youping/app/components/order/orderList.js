/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import OrderItem from './orderItem';
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import HeaderBar from '../common/headerBar';
import orderDetail from './orderDetail';
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
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            empty: false
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderBar initObj={{backName: '', barTitle: '我的订单'}}/>
                <ScrollView>
                    {
                        this.state.show ? <ListView
                            dataSource={this.state.dataSource}
                            initialListSize={10}    //设置显示条数
                            renderRow={this._renderRow}
                            renderSeparator={this._renderSeparator}
                            contentContainerStyle={styles.listStyle}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        /> : Util.loading
                    }
                </ScrollView>
            </View>
        );
    }

    //点击进入订单详情页面
    _showDetail(productId) {
        const orderList = this.props.orderState.orderList;
        const selectOrder = orderList.filter((item)=> {
            if (item.productId === productId) {
                return item
            }
        });
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'orderDetail',
                component: orderDetail,
                params: {
                    selectOrder: selectOrder[0],
                }
            })
        }
    }

    //渲染
    _renderRow(resource) {
        return !this.state.empty ?
            <OrderItem resource={resource} onPress={()=> {
                this._showDetail.bind(this, resource.productId)()
            }}/> : <EmptyPage/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    componentDidMount() {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(this.props.orderState.orderList),
            show: this.props.orderState.isLoading
        })
    }

    componentWillReceiveProps(nextProps) {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.orderState.orderList),
            show: nextProps.orderState.isLoading
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    text: {
        fontSize: 18,
        color: '#1d1d1d',
        textAlign: 'center'
    },
    btn: {
        backgroundColor: 'yellow',
        marginTop: 10,
        padding: 10,
        borderWidth: 1
    }
});

export default orderList