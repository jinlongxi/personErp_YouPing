/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ResourceItem from './resourceItem'
import EmptyPage from '../common/emptyPage';
import Header from '../../containers/commonContainer/headerContainer';
import ResourceDetailContainer from '../../containers/resource/resourceDetailContainer';
import Button from '../common/buttons';
import releaseReleaseContainer from '../../containers/resource/resourceReleaseContainer';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    ScrollView,
    RefreshControl
} from 'react-native';

class ResourceList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
        };
        this._renderRow = this._renderRow.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    render() {
        const {isRefreshing}=this.props.resourceListStore;
        return (
            <View style={{flex: 1}}>
                <Header initObj={{backName: '', barTitle: '我的资源',hiddenTab:false}} {...this.props}/>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="刷新中..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    dataSource={this.state.dataSource}
                    initialListSize={10}    //设置显示条数
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    contentContainerStyle={styles.listStyle}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
                <Button.ColoredRaisedButton onPress={()=> {
                    this._releaseResource.bind(this)()
                }}/>
            </View>
        );
    }

    //下拉刷新
    _onRefresh() {
        const {resourceListActions}=this.props;
        resourceListActions.refreshResourceList();
        setTimeout(() => {
            resourceListActions.requestResourceList();
        }, 500);
    }

    //点击进入发布资源页面
    _releaseResource() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'releaseReleaseContainer',
                component: releaseReleaseContainer,
            })
        }
    }

    //点击进入详情页面
    _showDetail(productId) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ResourceDetailContainer',
                component: ResourceDetailContainer,
                params: {
                    productId: productId
                }
            })
        }
    }

    //渲染
    _renderRow(resource) {
        return !this.state.empty ?
            <ResourceItem resource={resource} onPress={()=> {
                this._showDetail.bind(this, resource.productId)()
            }} {...this.props}/> : <EmptyPage/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth
        };
        return <View style={style} key={sectionID + rowID}/>
    }

    componentDidMount() {
        const {resourceListData}=this.props.resourceListStore;
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(resourceListData)
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    text: {
        fontSize: 18,
        color: '#1d1d1d',
        textAlign: 'center'
    },
    btn: {
        backgroundColor: 'yellow',
        marginTop: 10,
        padding: 10,
        borderWidth: 1
    }
});

export default ResourceList
