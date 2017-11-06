/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import LoginContainer from '../containers/loginContainer';
import TabsContainer from '../containers/tabsContainer'
import {connect} from 'react-redux';
import * as WeChat from 'react-native-wechat';
import DeviceStorage from '../utils/deviceStorage';
import {hasToken, noToken} from '../actions/login';
import {bindActionCreators} from 'redux';
import * as readCreators from '../actions/resource';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            hasToken: false
        }
    }

    render() {
        console.log(this.state.isLoggedIn);
        return (
            this.state.hasToken ? this.state.isLoggedIn ? <TabsContainer/> : <LoginContainer/> :
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><Text
                    style={{textAlign: 'center'}}>数据加载中...</Text></View>

        )
    }

    componentWillMount() {
        this.props.judgeToken();
    }

    componentWillReceiveProps(nextProps) {
        const that = this;
        setTimeout(function () {
            that.setState({
                isLoggedIn: nextProps.loginState.isLoggedIn,
                hasToken: nextProps.loginState.hasToken
            })
        }, 1000)
    }
}

const mapStateToProps = (state) => {
    WeChat.registerApp('wx5843eeb488708c80');
    return {
        loginState: state.loginStore
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //判断是否存在TOKEN
        judgeToken: ()=> {
            DeviceStorage.get('tarjeta').then((tags) => {
                if (tags) {
                    console.log(tags + '本地有TOKEN');
                    setTimeout(function () {
                        dispatch(hasToken(tags))
                    }, 1000);
                } else {
                    console.log(tags + '本地有TOKEN');
                    setTimeout(function () {
                        dispatch(noToken())
                    }, 1000);
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
