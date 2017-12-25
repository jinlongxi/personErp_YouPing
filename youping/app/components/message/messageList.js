/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import MessageItem from './messageItem';
import Util from '../../utils/util';
import EmptyPage from '../common/emptyPage';
import HeaderBar from '../common/headerBar';
import ClientInfo from '../../containers/clientContainer';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    ScrollView
} from 'react-native';

class messageList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1']),
            show: false,
            empty: false,
        };
        this._renderRow = this._renderRow.bind(this)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderBar initObj={{backName: '', barTitle: '客户列表'}}/>
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
            </View>
        );
    }

    //渲染
    _renderRow(resource) {
        return !this.state.empty ?
            <MessageItem resource={resource} onPress={this._clientInfo.bind(this, resource)}/> : <EmptyPage/>
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            height: 1,
            backgroundColor: "#CCCCCC"
        };
        return <View style={style} key="{sectionID+rowID}"/>
    }

    //跳转到客户信息页面
    _clientInfo(resource){
        console.log(resource)
        this.props.queryConsumerInfo(resource.user.realPartyId);
        this.props.hiddenTabBar();
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ClientInfo',
                component: ClientInfo,
                params: {
                    selectResource: resource,
                    realPartyId:resource.user.realPartyId,
                    messageState:this.props.messageState
                }
            })
        }
    }

    componentDidMount() {
        //设置数据源和加载状态
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
        });
        this.setState({
            dataSource: ds.cloneWithRows(this.props.messageState.messageList),
            show: this.props.messageState.isLoading
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(2222222222222222)
    //     //设置数据源和加载状态
    //     var ds = new ListView.DataSource({
    //         rowHasChanged: (oldRow, newRow)=>oldRow !== newRow
    //     });
    //     this.setState({
    //         dataSource: ds.cloneWithRows(nextProps.messageState.messageList),
    //         show: this.props.messageState.isLoading
    //     })
    // }
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

export default messageList
