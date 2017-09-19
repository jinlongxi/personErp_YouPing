/**
 * Created by jinlongxi on 17/9/19.
 */
import React, {Component} from 'react';
import OrderItem from '../order/orderItem';
import Request from '../common/request';
import ServiceURl from '../common/service';
import Util from '../common/util';
import Header from '../common/header';
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

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            queryMyResourceOrderList: null,
            show: false
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    initObj={{backName: '返回', barTitle: '我的订单'}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        this.state.show ? <ListView
                            dataSource={this.state.dataSource}
                            initialListSize={10}    //设置显示条数
                            renderRow={this._renderRow}
                            renderSeparator={this._renderSeparator}
                            contentContainerStyle={styles.listStyle}
                        /> : Util.loading
                    }
                </ScrollView>
            </View>
        );
    }


    //渲染
    _renderRow(resource) {
        return <OrderItem resource={resource}/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    //查询我的订单
    _getData() {
        const url = ServiceURl.personManager + 'queryMyResourceOrder';
        let that = this;
        Request.postRequest(url, '', function (response) {
            console.log('我的订单' + JSON.stringify(response));
            let {code:code, queryMyResourceOrderList:queryMyResourceOrderList}=response;
            if (code === '200') {
                console.log('000000000');
                var ds = new ListView.DataSource({
                    rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                });
                that.setState({
                    dataSource: ds.cloneWithRows(queryMyResourceOrderList),
                    show:true,
                })
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    componentWillMount() {
        this._getData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default OrderList
