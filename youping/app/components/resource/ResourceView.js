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
    constructor(props) {
        super(props);
    }

    render() {
        const Loading = this.props.resourceState.isLoading;
        return (
            Loading ? <View style={{flex: 1}}>
                {
                    this.props.resourceState.resourceList.length !== 0 ?
                        <ResourceList {...this.props}/>
                        :
                        <EmptyView {...this.props}/>
                }
            </View> : Util.loading
        )
    }
}

export default ResourceView
