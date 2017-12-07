/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ResourceItem from './resourceItem'
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import HeaderBar from '../common/headerBar';
import ReleaseResource from './releaseResource';
import ResourceDetail from './resourceDetail';
import Button from '../common/buttons';
import {COLOR, ThemeProvider, Toolbar} from 'react-native-material-ui';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    ScrollView
} from 'react-native';

class ResourceList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            empty: false
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderBar initObj={{backName: '', barTitle: '我的资源'}}/>
                <ScrollView>
                    {
                        this.state.show ? <ListView
                            dataSource={this.state.dataSource}
                            initialListSize={10}    //设置显示条数
                            renderRow={this._renderRow}
                            renderSeparator={this._renderSeparator}
                            contentContainerStyle={styles.listStyle}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        /> : Util.loading
                    }
                </ScrollView>
                <Button.ColoredRaisedButton onPress={()=> {
                    this._releaseResource.bind(this)()
                }}/>
            </View>
        );
    }

    //发布资源
    _releaseResource() {
        this.props.hiddenTabBar();
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ReleaseResource',
                component: ReleaseResource,
                params: {
                    releaseResource: this.props.releaseResource,
                    ...this.props
                },
            })
        }
    }

    //点击进入详情页面
    _showDetail(productId) {
        this.props.hiddenTabBar();
        const resourceList = this.props.resourceState.resourceList;
        const selectResource = resourceList.filter((item)=> {
            if (item.productId === productId) {
                return item
            }
        });
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ResourceDetail',
                component: ResourceDetail,
                params: {
                    selectResource: selectResource[0],//选中的数据
                    weChatShare: this.props.weChatShare,//微信分享
                    addResourceDesc: this.props.addResourceDesc,//完善资料
                    resourceState: this.props.resourceState,
                    spreadProduct: this.props.spreadProduct,//推广产品
                    salesDiscontinuation:this.props.salesDiscontinuation//下架商品
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
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    componentDidMount() {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(this.props.resourceState.resourceList),
            show: this.props.resourceState.isLoading
        })
    }

    componentWillReceiveProps(nextProps) {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.resourceState.resourceList),
            show: nextProps.resourceState.isLoading
        })
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
