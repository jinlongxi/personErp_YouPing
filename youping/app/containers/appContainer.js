/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import LoginContainer from '../containers/loginContainer';
import TabsContainer from '../containers/tabsContainer'
import {connect} from 'react-redux';
import DeviceStorage from '../utils/deviceStorage';
import {hasToken, noToken} from '../actions/login';
import Util from '../utils/util';
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
        return (
            this.state.hasToken ? this.state.isLoggedIn ? <TabsContainer/> : <LoginContainer/> : Util.bootUp
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
                    console.log('本地有TOKEN，不需要重新登录');
                    setTimeout(function () {
                        dispatch(hasToken(tags))
                    }, 1000);
                } else {
                    console.log('本地没有TOKEN，需要登录');
                    setTimeout(function () {
                        dispatch(noToken())
                    }, 1000);
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
