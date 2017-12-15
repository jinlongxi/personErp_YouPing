/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import ImageList from '../common/imageList';
import Chart from './chart';
import ButtonMenu from './buttonMenu';
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

    render() {
        const resourceData = this.props.selectResource;
        console.log(resourceData);
        const loading = this.props.resourceState.isLoading;
        return (
            loading ?
                <View style={{flex: 1}}>
                    <Header
                        initObj={{backName: '返回', barTitle: '资源详情', backType: 'resource', refresh: true}}
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
                                    <Chart/>
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
                    <View style={styles.buttonMenu}>
                        <ButtonMenu  {...this.props}/>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.moving} onPress={()=> {
                            this._weChatShare()
                        }}>
                            <Text style={styles.footer_btn_text}>微信分享</Text>
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
    },
    title: {
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
        width: Util.windowSize.width - 10,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10
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
    //底部
    footer: {
        flexDirection: 'row',
        width: Util.windowSize.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptying: {
        flex: 1,
        backgroundColor: '#FFAEB9'
    },
    moving: {
        flex: 1,
        backgroundColor: '#28a745'
    },
    footer_btn_text: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    //功能按钮
    buttonMenu: {
        position: 'absolute',
        right: 0,
        top: Util.windowSize.height*0.75,
        width: Util.windowSize.width*0.9,
        height: Util.windowSize.height*0.15
    }
});

export default ResourceDetail
