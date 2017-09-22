/**
 * Created by jinlongxi on 17/9/19.
 */
import React from 'react';
import Header from '../common/header';
import Util from '../common/util';
import ContactItem from './contactItem';
import ServiceURl from '../common/service';
import Request from '../common/request';
import EmptyPage from '../common/emptyPage';
import Contacts from 'react-native-contacts'
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
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            empty: false
        };
        this._renderRow = this._renderRow.bind(this);
        this._getContact = this._getContact.bind(this)
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
                <TouchableOpacity style={styles.telBtn} onPress={this._getContact}>
                    <Text style={styles.telText}>匹配手机联系人</Text>
                </TouchableOpacity>
            </View>
        )
    };

    //渲染
    _renderRow(resource) {
        return !this.state.empty ? <ContactItem resource={resource}/> : <EmptyPage/>

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
        const that = this;
        Request.postRequest(url, '', function (response) {
            //console.log("我的好友列表" + JSON.stringify(response));
            let {code:code, relationList:relationList}=response;
            if (code === '200') {
                if (relationList != '') {
                    var ds = new ListView.DataSource({
                        rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
                    });
                    that.setState({
                        show: true,
                        dataSource: ds.cloneWithRows(relationList),
                        empty: false
                    })
                } else {
                    that.setState({
                        show: true,
                        empty: true,
                    })
                }
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    //获取手机通讯录联系人
    _getContact() {
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                alert('打开通讯录失败')
            } else {
                var myContact = contacts.map(
                    function (user) {
                        return user.familyName + ":" + user.phoneNumbers.map(num=>num.number);
                    });
                const url = ServiceURl.personManager + 'matchingContact';
                const that = this;
                let data = '&contacts=' + JSON.stringify(myContact);
                Request.postRequest(url, data, function (response) {
                    console.log("匹配到的好友列表" + JSON.stringify(response));
                    let {code:code,count:count}=response;
                    if (code === '200') {
                        alert('成功匹配到'+count+'个联系人');
                        that._getData()
                    }
                }, function (err) {
                    console.log(JSON.stringify(err))
                });
            }
        })
    }

    componentWillMount() {
        this._getData();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    telBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 10,
        borderRadius: 5
    },
    telText: {
        fontSize: 18,
        color: 'blue'
    }
});

export default ContactList;