/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import MessageItem from './messageItem';
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import Header from './messageHeader';
import DeviceStorage from '../../utils/deviceStorage';
import InquiryItem from './inquiryItem';
import chatViewContainer from '../../containers/message/chatViewContaitner';
import replyPriceContainer from '../../containers/message/replyPriceContainer';
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

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row1']),
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        const {loading, switchType}=this.props.messageStore;
        return (
            <View style={{flex: 1}}>
                <Header initObj={{
                    backName: '',
                    barTitleLeft: '客户消息',
                    barTitleRight: '系统通知',
                    switchType: switchType,
                    onPress: this._switchButton.bind(this)
                }}/>
                {
                    loading ? Util.loading : <ListView
                        dataSource={this.state.dataSource}
                        initialListSize={10}    //设置显示条数
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                        contentContainerStyle={styles.listStyle}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </View>
        );
    }

    //切换列表显示
    _switchButton() {
        const {messageActions, messageStore} = this.props;
        messageActions.switchListType();
        messageActions.requestMessageList(!messageStore.switchType)
    }

    //渲染行
    _renderRow(resource) {
        const {messageList, switchType, requestsPriceList}=this.props.messageStore;
        if (switchType) {
            return (
                messageList.length > 0 ?
                    <MessageItem resource={resource} onPress={this._goChatWebView.bind(this, resource)}/> : <EmptyPage/>
            )
        } else {
            return (
                requestsPriceList.length > 0 ?
                    <InquiryItem resource={resource} onPress={this._goReplyPriceView.bind(this, resource)}/> :
                    <EmptyPage/>
            )
        }

    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth
        };
        return <View style={style} key={sectionID + rowID}/>
    }

    //点击进入聊天webView
    _goChatWebView(resource) {
        this.props.hiddenTabBar();
        DeviceStorage.get('partyId').then((partyId)=> {
            const username = partyId;
            const password = partyId + '111';
            const payToPartyId = resource.user.realPartyId;
            const productId = resource.objectId;
            const url = "https://www.yo-pe.com/pejump/" + username + '/' + password + '/' + payToPartyId + '/' + productId + '/' + 'NA';
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'chatViewContainer',
                    component: chatViewContainer,
                    params: {
                        url: url,
                        productId: productId,
                        payToPartyId: payToPartyId,
                        realToId: resource.realToId
                    }
                })
            }
        });
    }

    //点击进入回复询价页面
    _goReplyPriceView(resource) {
        this.props.hiddenTabBar();
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'replyPriceContainer',
                component: replyPriceContainer,
                params: {
                    resource: resource,
                }
            })
        }
    }

    componentDidMount() {
        const {messageActions, messageStore} = this.props;
        messageActions.requestMessageList(messageStore.switchType);
    }

    componentWillReceiveProps(nextProps) {
        const {loading, messageList, switchType, requestsPriceList}=nextProps.messageStore;

        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        if (switchType) {
            if (messageList.length > 0) {
                this.setState({
                    loading: loading,
                    dataSource: ds.cloneWithRows(messageList),
                })
            }
        } else {
            if (requestsPriceList.length > 0) {
                this.setState({
                    loading: loading,
                    dataSource: ds.cloneWithRows(requestsPriceList),
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    btn: {
        backgroundColor: 'yellow',
        marginTop: 10,
        padding: 10,
        borderWidth: 1
    }
});

export default MessageList
