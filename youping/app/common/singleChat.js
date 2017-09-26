import {GiftedChat,Bubble} from 'react-native-gifted-chat';
import React from 'react';
import Header from '../common/header';
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

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: '请问有什么事情?我的手机号码是15618323607!',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native1',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }

    //发送消息
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
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

}

export default SingleChat
