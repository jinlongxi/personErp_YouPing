/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import EmptyView from './emptyView';
import ResourceList from './resourceList'
import Util from '../../utils/util'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class ResourceView extends React.Component {
    render() {
        const {loading, resourceListData}=this.props.resourceListStore;
        return (
            loading ? Util.loading :
                resourceListData.length > 0 ?
                    <ResourceList {...this.props}/>
                    :
                    <EmptyView {...this.props}/>
        )
    }

    componentDidMount() {
        const {resourceListActions}=this.props;
        setTimeout(function () {
            resourceListActions.requestResourceList();
        },100)
    }
}

export default ResourceView
