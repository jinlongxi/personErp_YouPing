/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import ServiceURL from '../common/service';
import Request from '../common/request';
import FuzzyList from './fuzzyList'
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

class Search extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.state = {
            text: null,
            show: false,
            dataSource: ds.cloneWithRows([{productName: '没有相关数据'}]),
        };
        this._queryResource = this._queryResource.bind(this);
        this._onChange = this._onChange.bind(this);
        this._cancel = this._cancel.bind(this);
    }

    //搜索资源
    _queryResource(text) {
        if(text){
            let url = ServiceURL.personManager + 'ajaxQueryResource';
            let data = '&productName=' + text;
            let that = this;
            Request.postRequest(url, data, function (response) {
                let {code:code, queryResourceList:queryResourceList}=response;

                //给模糊查询列表准备数据
                var ds = new ListView.DataSource({
                    rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                });
                if (code === '200' && queryResourceList != '') {
                    that.setState({
                        show: true,
                        dataSource: ds.cloneWithRows(queryResourceList),
                    })
                }else{
                    that.setState({
                        dataSource: ds.cloneWithRows([{productName: '没有相关数据'}]),
                    })
                }
                console.log(response)
            }, function (err) {
                console.log(err)
            })
        }
    }

    //定义搜索框onChange
    _onChange(text) {
        console.log(text+'dfshgkjsdfkgjhdskjfghdsfkgjh');
        this.setState({
            text: text,
            show: true
        });
        this._queryResource(text)
    }

    //取消搜索
    _cancel() {
        this.setState({
            text: null,
            show: false
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerBar}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input} {...this.props}
                            onChangeText={(text)=>this._onChange(text)}
                            clearButtonMode="always"
                            placeholder='请输入你要搜索的资源名称'
                            value={this.state.text}
                        />
                    </View>
                    {
                        this.state.show ?
                            <TouchableOpacity style={styles.btn} onPress={this._cancel}>
                                <Text style={styles.search}  {...this.props} >取消</Text>
                            </TouchableOpacity> : null
                    }
                </View>
                <View>
                    {
                        this.state.show ? <FuzzyList dataSource={this.state.dataSource} {...this.props}/> : null
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    containerBar: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        height: 44,
        marginTop: 10
    },
    inputContainer: {
        flex: 1,
        margin: 5,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingLeft: 5
    },
    btn: {
        width: 55,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#23beff',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 44
    },
    title: {
        fontSize: 18,
        color: '#1d1d1d'
    },
});

export default Search

