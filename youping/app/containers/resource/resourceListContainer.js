/**
 * Created by jinlongxi on 18/2/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as resourceListCreators from '../../actions/resource/resourceListAction';
import ResourceView from '../../components/resource/resourceView';
import {hideTabBar} from '../../actions/tab/tabAction'

const mapStateToProps = (state) => {
    const {resourceListStore} = state;
    return {
        resourceListStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const resourceListActions = bindActionCreators(resourceListCreators, dispatch);
    return {
        resourceListActions,
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
    };
};

const ResourceListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceView);
export default ResourceListContainer
