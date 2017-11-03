/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMyInfo} from '../actions/about';
import AboutView from '../components/about/AboutView';
const mapStateToProps = (state) => {
    return {
        aboutState: state.aboutStore
    }
};


const mapDispatchToProps = (dispatch)=> {
    dispatch(fetchMyInfo());
    return {
        getAboutInfo: ()=> {
            //请求数据
            dispatch(fetchMyInfo());
        }
    }
};

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutView);
export default AboutContainer
