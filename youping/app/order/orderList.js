/**
 * Created by jinlongxi on 17/9/19.
 */
import React, {Component} from 'react';
import OrderItem from '../order/orderItem';
import Request from '../common/request';
import ServiceURl from '../common/service';
import Util from '../common/util';
import Header from '../common/header';
import EmptyPage from '../common/emptyPage';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    ScrollView,
    RefreshControl
} from 'react-native';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            isRefreshing: false,
            empty:false
        };
        this._renderRow = this._renderRow.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>全部订单</Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}>

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

    //监听滚动条
    _onScroll(event) {
        if (this.state.loadMore) {
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        console.log('offsetY-->' + y);
        console.log('height-->' + height);
        console.log('contentHeight-->' + contentHeight);
        if (y + height >= contentHeight - 20) {
            this.setState({
                loadMore: true
            });
        }
    }

    //下拉刷新
    _onRefresh() {
        this.setState({
            isRefreshing: true
        });
        this._getData();
    }


    //渲染
    _renderRow(resource) {
        return !this.state.empty?<OrderItem resource={resource}/>:<EmptyPage/>
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
                if(queryMyResourceOrderList!=''){
                    var ds = new ListView.DataSource({
                        rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                    });
                    that.setState({
                        dataSource: ds.cloneWithRows(queryMyResourceOrderList),
                        show: true,
                        isRefreshing: false,
                        empty:false
                    })
                }else{
                    that.setState({
                        show: true,
                        empty:true,
                        isRefreshing: false,
                    });
                }
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
    header:{
        height:50,
        backgroundColor:"#1DBAF1",
        justifyContent:'center',
        alignItems:"center",
        paddingTop: 15,
    },
    header_text:{
        fontSize:18,
        color:'#fff'
    }
});

export default OrderList
