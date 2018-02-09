/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import Login from '../../components/login/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginCreators from '../../actions/login/loginAction';
const mapStateToProps = (state) => {
    const {loginStore}=state;
    return {
        loginStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    const loginActions = bindActionCreators(loginCreators, dispatch);
    return {
        loginActions
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer
