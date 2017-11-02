/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResourceView from '../components/resource/ResourceView'
import {fetchResourceList, releaceResource} from '../actions/resource';

const mapStateToProps = (state) => {
    return {
        resourceState: state.resourceStore
    }
};


const mapDispatchToProps = (dispatch)=> {
    //请求数据
    dispatch(fetchResourceList());
    return {
        //发布资源
        onclick: (picture, productName, productPrice)=> {
            dispatch(releaceResource(picture, productName, productPrice))
        },
    }
};

const ResourceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceView);
export default ResourceContainer
