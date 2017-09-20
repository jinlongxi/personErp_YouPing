/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ResourceItem from './resourceItem'
import Request from '../common/request';
import ServiceURl from '../common/service';
import ResourceDetail from '../resource/resourceDetail'
import Util from '../common/util'
import DeviceStorage from '../common/deviceStorage'
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

class myResourceList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            show: false
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
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
        );
    }

    //点击进入详情页面
    _showDetail(productId) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ResourceDetail',
                component: ResourceDetail,
                params: {
                    productId: productId,
                    resourceType:'my'
                }
            })
        }
    }

    //渲染
    _renderRow(resource) {
        return <ResourceItem resource={resource} onPress={this._showDetail.bind(this, resource.productId)}/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    //查询我的资源列表
    _getData() {
        const url = ServiceURl.personManager + 'queryMyResource';
        const that = this;
        Request.postRequest(url, '', function (response) {
            console.log("我的资源列表" + JSON.stringify(response));
            let {code:code, productCategoryId:productCategoryId, myResourceList:myResourceList}=response;
            if (code === '200') {
                if (myResourceList != '') {
                    //设置数据源和加载状态
                    var ds = new ListView.DataSource({
                        rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                    });
                    //
                    DeviceStorage.save('productCategoryId', productCategoryId);
                    that.setState({
                        productCategoryId: productCategoryId,
                        dataSource: ds.cloneWithRows(myResourceList),
                        show: true
                    });
                } else {
                    DeviceStorage.save('productCategoryId', productCategoryId);
                    that.setState({
                        productCategoryId: productCategoryId,
                        show: true
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
        marginTop: 20
    },
});

export default myResourceList
