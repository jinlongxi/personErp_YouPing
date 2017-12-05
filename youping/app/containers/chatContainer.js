/**
 * Created by jinlongxi on 17/11/9.
 */
import React from 'react';
import {connect} from 'react-redux';
import {fetchMessageOne, sendMessageOne, sendImageMessage} from '../actions/message'
import Header from '../components/common/header';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from '../components/chat/CustomActions';
import CustomView from '../components/chat/CustomView';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';


class SingleChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.refreshBack = this.refreshBack.bind(this);
    }

    //发送消息
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        //区分是哪个模块跳转到聊天模块的！如果是订单模块this.props.selectResource.user 是undefined
        let realPartyId, objectId;
        if (this.props.selectResource.user) {
            realPartyId = this.props.selectResource.user.realPartyId;
            objectId = this.props.selectResource.objectId;
        } else {
            realPartyId = this.props.selectResource.realPartyId;
            objectId = this.props.selectResource.orderId
        }
        //发送文本
        const text = messages[0].text;
        if (text) {
            console.log(text, realPartyId, objectId);
            this.props.sendMessage(text, realPartyId, objectId);
        }
        //发送图片
        const image = messages[0].image;
        const pay_qr_code = messages[0].pay_qr_code;
        if (image&&!pay_qr_code) {
            const imageArray = [];
            for (var i = 0; i < messages.length; i++) {
                let source = {uri: messages[i].image};
                imageArray.push(source)
            }
            console.log(imageArray);
            this.props.sendImageMessage(imageArray, realPartyId, objectId)
        }
        //发送收款二维码
        if (image&&pay_qr_code) {
            const imageArray = [];
            for (var i = 0; i < messages.length; i++) {
                let source = {uri: messages[i].pay_qr_code};
                imageArray.push(source)
            }
            console.log(imageArray);
            this.props.sendImageMessage(imageArray, realPartyId, objectId,'Y')
        }
        //发送位置
        const location = messages[0].location;
        if (location) {
            this.props.sendLocationMessage(location, realPartyId, objectId);
        }

    }

    //加载历史消息
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000);
    }

    //更多功能(发送图片，位置)
    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {
            },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    //渲染左边
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    //系统消息
    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

    //渲染自定义视图（地图）
    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    //渲染底部
    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header initObj={{backName: '返回', barTitle: '单聊页面'}}
                        navigator={this.props.navigator}
                />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    user={{
                        _id: 1, // sent messages should have same user._id
                    }}
                    locale="zh-cn"
                    placeholder='请输入你想要发送的文本内容'
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderCustomView={this.renderCustomView}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }

    //判断是否返回时刷新页面
    refreshBack() {
        function* numbers() {
            console.log('function start.');

            var v1 = yield 0;
            console.log('v1 = ' + v1);

            var v2 = yield 1;
            console.log('v2 = ' + v2);

            return 5;
        }

        var nums = numbers();
        console.log(nums.next(2));
    }

    componentWillMount() {
        this._isMounted = true;
        let realPartyId;
        if (this.props.selectResource.user) {
            realPartyId = this.props.selectResource.user.realPartyId;
        } else {
            realPartyId = this.props.selectResource.realPartyId;
        }

        //请求数据
        this.props.getSingleChatL(realPartyId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        this.refreshBack();
        const data = nextProps.messageState.chatData;
        const partyId = nextProps.messageState.partyId;
        //更新页面数据
        const messagesNew = [];
        for (var i = 0; i < data.length; i++) {
            if (partyId == data[i].user.fromParty) {
                if (data[i].messageLogTypeId === 'TEXT') {
                    if(data[i].text.search("<button")===-1){
                        messagesNew.push({
                            _id: i,
                            text: data[i].text,
                            createdAt: new Date(),
                            user: {
                                _id: 1,
                                name: data[i].user.name,
                                avatar: data[i].user.avatar,
                            },
                        },)
                    }
                } else if (data[i].messageLogTypeId === 'IMAGE') {
                    messagesNew.push({
                        _id: i,
                        image: data[i].text + "?x-oss-process=image/resize,w_375,h_667/quality,q_100",
                        createdAt: new Date(),
                        user: {
                            _id: 1,
                            name: data[i].user.name,
                            avatar: data[i].user.avatar,
                        },
                    },)
                } else if (data[i].messageLogTypeId === 'LOCATION') {
                    messagesNew.push({
                        _id: i,
                        location: {
                            latitude: parseFloat(data[i].latitude),
                            longitude: parseFloat(data[i].longitude),
                        },
                        createdAt: new Date(),
                        user: {
                            _id: 1,
                            name: data[i].user.name,
                            avatar: data[i].user.avatar,
                        },
                    },)
                }
            } else {
                if (data[i].messageLogTypeId === 'TEXT') {
                    if(data[i].text.search("<button")===-1){
                        messagesNew.push({
                            _id: i,
                            text: data[i].text,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: data[i].user.name,
                                avatar: data[i].user.avatar,
                            },
                        },)
                    }
                } else if (data[i].messageLogTypeId === 'IMAGE') {
                    messagesNew.push({
                        _id: i,
                        image: data[i].text + "?x-oss-process=image/resize,w_375,h_667/quality,q_100",
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: data[i].user.name,
                            avatar: data[i].user.avatar,
                        },
                    },)
                } else if (data[i].messageLogTypeId === 'LOCATION') {
                    messagesNew.push({
                        _id: i,
                        location: {
                            latitude: parseFloat(data[i].latitude),
                            longitude: parseFloat(data[i].longitude),
                        },
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: data[i].user.name,
                            avatar: data[i].user.avatar,
                        },
                    },)
                }
            }
        }
        this.setState({
            messages: messagesNew
        });
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //查询单聊数据
        getSingleChatL: (partyIdFrom)=> {
            dispatch(fetchMessageOne(partyIdFrom, 'click'));
        },
        //发送消息
        sendMessage: (text, partyIdTo, objectId)=> {
            dispatch(sendMessageOne(text, partyIdTo, objectId, 'TEXT'))
        },
        //发送图片消息
        sendImageMessage: (images, partyIdTo, objectId,pay_qr_code)=> {
            dispatch(sendImageMessage(images, partyIdTo, objectId, 'IMAGE',pay_qr_code))
        },
        //发送位置消息
        sendLocationMessage: (location, partyIdTo, objectId,)=> {
            dispatch(sendMessageOne(location, partyIdTo, objectId, 'LOCATION'))
        },
    }
};

const chatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleChat);

export default chatContainer
