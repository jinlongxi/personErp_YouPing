/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import FuzzyItem from './fuzzyItem';
import ServiceURL from '../common/service';
import Request from '../common/request';
import ResourceItem from '../resource/resourceItem';
import ResourceDetail from '../resource/resourceDetail';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ListView
} from 'react-native';

class FuzzyList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            show: false,
            dataSourceNew: ds.cloneWithRows(['row 1']),
        };
        this._renderRow = this._renderRow.bind(this);  //这个地方一样要记住，不然不能点击
    }

    //选中模糊查询内容
    _selectPress(productName) {
        console.log('点滴但暗示大脑反射地方' + productName);
        //点击查询相关资源
        let url = ServiceURL.personManager + 'queryMoreResource';
        let that = this;
        let data = '&productName=' + productName;
        Request.postRequest(url, data, function (response) {
            console.log(JSON.stringify(response));
            let {code:code, resourceList:resourceList}=response;
            if (code === '200') {
                //设置数据源和加载状态
                var ds = new ListView.DataSource({
                    rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                });
                that.setState({
                    show: true,
                    dataSourceNew: ds.cloneWithRows(resourceList),
                })
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        })
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
                }
            })
        }
    }

    //搜索到的数据展示
    _renderRow(data) {
        return this.state.show ? <ResourceItem resource={data} onPress={this._showDetail.bind(this, data.productId)}/> :
            <FuzzyItem data={data} onPress={this._selectPress.bind(this, data.productName)}/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    render() {
        var dataSource = this.props.dataSource;

        return (
            <View>
                {
                    this.state.show ? <ListView
                        dataSource={this.state.dataSourceNew}
                        initialListSize={10}    //设置显示条数
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                        contentContainerStyle={styles.listStyle}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    /> :
                    <ListView
                    dataSource={dataSource}
                    initialListSize={10}    //设置显示条数
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    contentContainerStyle={styles.listStyle}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    />
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({});

export default FuzzyList

