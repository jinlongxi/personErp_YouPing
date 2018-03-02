/**
 * Created by jinlongxi on 18/2/7.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as resourceDetailCreators from '../../actions/resource/resourceDetailAction';
import ResourceDetail from '../../components/resource/resourceDetail';

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
    };
};

const ResourceDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceDetail);

export default ResourceDetailContainer
