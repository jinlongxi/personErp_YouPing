import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import React from 'react';
import Header from '../common/header';
import
{
    View,
}
    from 'react-native'

class SingleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
        }
    }

    //发送消息
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        const objectId = this.props.selectResource.objectId;
        const partyIdTo = this.props.selectResource.user._id;
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
                    user={{
                        _id: 1,
                    }}
                />
            </View>

        );
    }

    componentWillMount() {
        console.log(this.props);
        const partyIdFrom = this.props.selectResource.user._id;
        this.props.getSingleChatL(partyIdFrom);
        const partyId = this.props.messageState.partyId;
        const data = this.props.messageState.chatData;
        const messagesNew = [];
        for (var i = 0; i < data.length; i++) {
            if (partyId === data[i].user._id) {
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
        console.log(messagesNew);
        const that = this;
        setTimeout(function () {
            that.setState({
                messages: messagesNew
            });
        }, 2000)
    }


    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    //     const data = nextProps.messageState.chatData;
    //     console.log(data.length)
    //     const messagesNew = [];
    //     for (var i = 0; i < data.length; i++) {
    //         console.log(data[i])
    //         messagesNew.push({
    //             _id: i,
    //             text: data[i].text,
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: data[i].user.name,
    //                 avatar: data[i].user.avatar,
    //             },
    //         },)
    //     }
    //     console.log(messagesNew);
    //     this.setState({
    //         messages: messagesNew
    //     });
    //}

}

export default SingleChat
