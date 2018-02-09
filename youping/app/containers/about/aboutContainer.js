/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as aboutCreators from '../../actions/about/aboutAction';
import * as loginCreators from '../../actions/login/loginAction';
import AboutView from '../../components/about/AboutView';
const mapStateToProps = (state) => {
    const {aboutStore}=state;
    return {
        aboutStore
    }
};


const mapDispatchToProps = (dispatch)=> {
    const aboutActions = bindActionCreators(aboutCreators, dispatch);
    const loginActions = bindActionCreators(loginCreators, dispatch);
    return {
        aboutActions,
        loginActions
    }
};

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutView);
export default AboutContainer
