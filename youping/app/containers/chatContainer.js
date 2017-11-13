/**
 * Created by jinlongxi on 17/11/9.
 */
/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessageList, fetchMessageOne, sendMessageOne} from '../actions/message'
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import Header from '../components/common/header';
import
{
    View,
}
    from 'react-native'

class SingleChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    //发送消息
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        const objectId = this.props.selectResource.objectId;
        const partyIdTo = this.props.selectResource.user.fromParty;
        const text = messages[0].text;
        this.props.sendMessage(text, partyIdTo, objectId);
    }

    //左边
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

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '单聊页面'}}
                    navigator={this.props.navigator}
                />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    placeholder="请输入发送信息"
                    renderBubble={this.renderBubble}
                    locale="zh-cn"
                    showUserAvatar={true}
                    user={{
                        _id: 1,
                    }}
                />
            </View>

        );
    }

    componentWillMount() {
        console.log(this.props);
        const partyIdFrom = this.props.selectResource.user.fromParty;
        if (this.props.messageState.chatData.length === 0) {
            this.props.getSingleChatL(partyIdFrom);
        } else {
            console.log('使用树上的数据');
            const data = this.props.messageState.chatData;
            const partyId = this.props.messageState.partyId;
            const messagesNew = [];
            for (var i = 0; i < data.length; i++) {
                if (partyId == data[i].user.fromParty) {
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
                } else {
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
            }
            this.setState({
                messages: messagesNew
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const data = nextProps.messageState.chatData;
        const partyId = nextProps.messageState.partyId;
        const messagesNew = [];
        for (var i = 0; i < data.length; i++) {
            if (partyId == data[i].user.fromParty) {
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
            } else {
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
        }
        this.setState({
            messages: messagesNew
        });
    }
}

const mapStateToProps = (state) => {
    return {
        messageState: state.messageStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //查询单聊数据
        getSingleChatL: (partyIdFrom)=> {
            dispatch(fetchMessageOne(partyIdFrom,'click'));
        },
        //发送消息
        sendMessage: (text, partyIdTo, objectId)=> {
            dispatch(sendMessageOne(text, partyIdTo, objectId))
        }
    }
};

const chatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleChat);

export default chatContainer
