/**
 * Created by jinlongxi on 17/9/19.
 */
import React from 'react';
import Header from '../common/header';
import Util from '../common/util';
import ContactItem from './contactItem';
import ServiceURl from '../common/service';
import Request from '../common/request';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView,
    ListView
} from 'react-native';

class ContactList extends React.Component {
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
            <View style={styles.container}>
                <Header initObj={{backName: '返回', barTitle: '联系人列表'}}
                        navigator={this.props.navigator}/>
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
        )
    };

    //渲染
    _renderRow(resource) {
        return <ContactItem resource={resource}/>
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
        const url = ServiceURl.personManager + 'queryMyRelationShip';
        const that=this;
        Request.postRequest(url, '', function (response) {
            console.log("我的好友列表" + JSON.stringify(response));
            let {code:code,relationList:relationList}=response;
            if(code === '200'){
                var ds = new ListView.DataSource({
                    rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                });
                that.setState({
                    show:true,
                    dataSource: ds.cloneWithRows(relationList),
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
        flexDirection: 'column'
    }
});

export default ContactList;