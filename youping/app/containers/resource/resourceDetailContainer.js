/**
 * Created by jinlongxi on 18/2/7.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as resourceDetailCreators from '../../actions/resource/resourceDetailAction';
import ResourceDetail from '../../components/resource/resourceDetail';
import {hideTabBar} from '../../actions/tab/tabAction'

const mapStateToProps = (state) => {
    const {resourceDetailStore} = state;
    return {
        resourceDetailStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const resourceDetailActions = bindActionCreators(resourceDetailCreators, dispatch);
    return {
        resourceDetailActions,
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
    };
};

const ResourceDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceDetail);

export default ResourceDetailContainer
