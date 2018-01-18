/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import MessageItem from './messageItem';
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import Header from '../../components/common/headerBar';
import ChatWebView from '../../containers/clientContainer';
import DeciveStorage from '../../utils/deviceStorage';
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

class messageList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            empty: false,
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header initObj={{backName: '', barTitle: '消息列表'}}/>
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

    //渲染
    _renderRow(resource) {
        return !this.state.empty ?
            <MessageItem resource={resource} onPress={this._goChatWebView.bind(this, resource)}/> : <EmptyPage/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key={sectionID + rowID}/>
    }

    //点击进入聊天webView
    _goChatWebView(resource) {
        console.log(resource);
        this.props.cleanSessionMessage(resource.realToId);
        this.props.hiddenTabBar();
        DeciveStorage.get('partyId').then((partyId)=> {
            const username = partyId;
            const password = partyId + '111';
            const payToPartyId = resource.user.realPartyId;
            const productId = resource.objectId;
            const url = "https://www.yo-pe.com/pejump/" + username + '/' + password + '/' + payToPartyId + '/' + productId + '/' + 'NA';
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'ChatWebView',
                    component: ChatWebView,
                    params: {
                        url: url,
                        productId: productId,
                        payToPartyId:payToPartyId
                    }
                })
            }
        });
    }

    componentDidMount() {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(this.props.messageState.messageList),
            show: this.props.messageState.isLoading
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

export default messageList
