/**
 * Created by jinlongxi on 18/2/9.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as resourceReleaseCreators from '../../actions/resource/resourceReleaseAction';
import ResourceRelease from '../../components/resource/resourceRelease';
import * as tabCreators from '../../actions/tab/tabAction';

const mapStateToProps = (state) => {
    const {resourceReleaseStore} = state;
    return {
        resourceReleaseStore
    };
};

const mapDispatchToProps = (dispatch)=> {
    const resourceReleaseActions = bindActionCreators(resourceReleaseCreators, dispatch);
    const tabActions = bindActionCreators(tabCreators, dispatch);
    return {
        resourceReleaseActions,
        tabActions
    };
};

const ResourceReleaseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceRelease);
export default ResourceReleaseContainer
