/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import AddResourceDesc from './addResourceDesc';
import Util from '../../utils/util';
import ImageList from '../common/imageList';
import ExpandableView from 'react-native-expandable-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';

class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);
        this._weChatShare = this._weChatShare.bind(this);
    }

    //微信分享
    _weChatShare() {
        this.props.weChatShare(this.props.selectResource.productId,
            this.props.selectResource.detailImageUrl,
            this.props.selectResource.productName)
    }

    //完善信息
    _addResourceDesc() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'AddResourceDesc',
                component: AddResourceDesc,
                params: {
                    selectResource: this.props.selectResource,
                    addResourceDesc: this.props.addResourceDesc//传递提交方法
                }
            })
        }
    }

    render() {
        const resourceData = this.props.selectResource;
        const loading = this.props.resourceState.isLoading;
        return (
            loading ?
                <View style={{flex: 1}}>
                    <Header
                        initObj={{backName: '返回', barTitle: '资源详情', backType: 'resource',refresh:true}}
                        navigator={this.props.navigator}
                    />
                    <ScrollView>
                        {
                            resourceData == null ? null :
                                <View style={styles.container}>
                                    {
                                        resourceData.detailImageUrl != null ?
                                            <Image source={{uri: resourceData.detailImageUrl}}
                                                   style={styles.image}
                                                   accessibilityLabel="图片加载中。。。"
                                                   blurRadius={1}
                                                   defaultSource={require('../../img/loading.gif')}
                                            />
                                            : null
                                    }
                                    <Text style={styles.title}>资源简介:{resourceData.productName}</Text>
                                    <Text style={styles.text}>资源编号:{resourceData.productId}</Text>
                                    {
                                        resourceData.morePicture.length > 0 ?
                                            <View style={{flex: 1}}>
                                                <ImageList data={resourceData.morePicture}/>
                                                <Text style={styles.text}>{resourceData.description}</Text>
                                            </View>
                                            : null
                                    }
                                </View>
                        }
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.addDesc_btn} onPress={()=> {
                            this._addResourceDesc()
                        }}>
                            <Text style={styles.placeOrder_btn}
                            >完善信息</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weChatShare_btn} onPress={()=> {
                            this._weChatShare()
                        }}>
                            <Text style={styles.placeOrder_btn}
                            >微信分享</Text>
                        </TouchableOpacity>
                    </View>
                </View> : Util.isLoading
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000D22',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    //按钮文本样式
    placeOrder_btn: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    },
    //微信分享
    weChatShare_btn: {
        backgroundColor: '#90EE90',
        width: 160,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    //完善信息按钮
    addDesc_btn: {
        backgroundColor: '#83ccfc',
        width: 160,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    //按钮容器
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default ResourceDetail
