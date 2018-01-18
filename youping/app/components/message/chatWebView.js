/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import Swipeout from 'react-native-swipeout';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    WebView,
    Image,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

class customerWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectBtn: 1,
            text: '',
            resourceList: [],
            partyRelation: '',
            distributingLeaflets: {}
        };
        this.swipeOutBtn = [
            {
                text: '切换资源',
                backgroundColor: 'red',
                onPress: null
            },
            {
                text: '编辑',
                backgroundColor: 'blue',
            }

        ];
    }

    render() {
        let resourceList = this.state.resourceList;
        console.log(resourceList.productName)
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Header initObj={{backName: '返回', barTitle: '单聊页面', backType: 'message', refresh: true}}
                        navigator={this.props.navigator}
                />
                <Swipeout right={this.swipeOutBtn} autoClose={true} style={{backgroundColor: 'white'}}>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.imageContainer}>
                            {
                                resourceList.detailImageUrl != null ?
                                    <Image
                                        source={{uri: resourceList.detailImageUrl + '?x-oss-process=image/resize,w_100,h_100/quality,q_50'}}
                                        style={styles.image}
                                        defaultSource={require('../../img/loading.gif')}
                                    /> : null
                            }

                        </View>
                        <View style={styles.contentContainer}>
                            {
                                resourceList.productName != undefined ?
                                    <View>
                                        <View style={styles.textContainer}>
                                            <Text numberOfLines={1}
                                                  style={styles.resourceTitle}>资源名称:{resourceList.productName}</Text>
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{color: '#FA8072'}}>客户关系:{this.state.partyRelation}</Text>
                                        </View>
                                    </View>
                                    : null
                            }
                            <View style={styles.textContainer}>
                                {this.state.partyRelation === '潜在客户' ?
                                    this.state.distributingLeaflets != undefined ?
                                        <Text style={{color: '#B03060'}}
                                              numberOfLines={1}>来自:"{this.state.distributingLeaflets}"的转发</Text>
                                        : <Text style={{color: '#B03060'}}
                                                numberOfLines={1}>来自:自己的分享</Text>
                                    : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
                <WebView
                    startInLoadingState={true}
                    source={{uri: this.props.url}}
                    mixedContentMode="always"
                />
            </View>
        )
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.queryConsumerInfo(this.props.payToPartyId, this.props.productId)
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            resourceList: nextProps.messageState.clientData,
            partyRelation: nextProps.messageState.partyRelation,
            distributingLeaflets: nextProps.messageState.distributingLeaflets.workerName
        })
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Util.windowSize.width
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 2
    },
    contentContainer: {
        flex: 2,
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
    },
    resourceTitle: {
        fontSize: 18,
        color: '#1d1d1d',
    },
    publisher_author: {
        color: "#A3A3A3",
        fontSize: 13
    },
    price: {
        color: '#2bb2a3',
        fontSize: 16,
    },
    pages: {
        color: "#ff00ff",
        marginLeft: 10
    }
});

export default customerWebView;
