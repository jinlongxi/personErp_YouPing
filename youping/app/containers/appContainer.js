/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeviceStorage from '../utils/deviceStorage';
import * as loginCreators from '../actions/login/loginAction';
import {bindActionCreators} from 'redux';
import Util from '../utils/util';
import LoginContainer from './login/loginContainer';
import TabsContainer from './tabs/tabsContainer'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isLoggedIn, booting}=this.props.loginStore;
        return (
            booting ? Util.bootUp : isLoggedIn ? <TabsContainer/> : <LoginContainer/>
        )
    }

    componentDidMount() {
        const {loginActions}=this.props;
        DeviceStorage.get('tarjeta').then((tarjeta) => {
            setTimeout(function () {
                if (tarjeta) {
                    loginActions.weChatLoginSuccess(tarjeta);
                } else {
                    loginActions.weChatLoginOut();
                }
            }, 1500)
        });
    }
}

const mapStateToProps = (state) => {
    const {loginStore} =state;
    return {
        loginStore
    }
};

const mapDispatchToProps = (dispatch) => {
    const loginActions = bindActionCreators(loginCreators, dispatch);
    return {
        loginActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
