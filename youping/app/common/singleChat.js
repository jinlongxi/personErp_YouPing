import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import React from 'react';
import Header from '../common/header';
import ServiceUrl from '../common/service';
import Request from '../common/request';
import JPushModule from 'jpush-react-native';
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
            payToPartyId:this.props.payToPartyId,
            partyIdFrom:this.props.partyIdFrom,
            orderId:this.props.orderId
        }
    }

    //发送消息
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        const url = ServiceUrl.platformManager+'sendMessage';
        const data = '&message='+messages[0].text+'&partyIdTo='+this.state.payToPartyId+'&orderId='+this.props.orderId;
        console.log(JSON.stringify(data));
        Request.postRequest(url,data,function(response){
            console.log(JSON.stringify(response))
        },function(err){
            console.log(JSON.stringify(err))
        })
    }

    //接受新的消息
    _receiveMessage(){
        const url = ServiceUrl.platformManager+'loadMessage';
        const data = '&partyIdFrom='+this.state.payToPartyId;
        const that=this;
        console.log(JSON.stringify(data));
        Request.postRequest(url,data,function(response){
            console.log(JSON.stringify(response));
            let {code:code,messages:messages}=response;
            if(code==='200'){
                that.setState({
                    messages: messages
                });
            }
        },function(err){
            console.log(JSON.stringify(err))
        })
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
        console.log(this.props.payToPartyId+'yuyuyuyuyuyuyuy')
        this._receiveMessage();
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: '请问有什么事情?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native1',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id: 2,
                    text: '我的手机号码是15618323607!',
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

}

export default SingleChat
