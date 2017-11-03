/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../common/header';
import SectionViewList from '../common/sectionList';
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
        this.state = {
            resourceData: null,
            resourceType: this.props.resourceType
        };
        this._salesDiscontinuation = this._salesDiscontinuation.bind(this);
        this._wechatShare = this._wechatShare.bind(this);
    }

    //下架商品
    _salesDiscontinuation() {
        this.props.salesDiscontinuation(this.state.resourceData.productId)
    }

    //微信分享
    _wechatShare() {
        this.props.wechatShare(this.state.resourceData.productId,this.state.resourceData.detailImageUrl,this.state.resourceData.productName)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    initObj={{backName: '返回', barTitle: '资源详情'}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {
                        this.state.resourceData == null ? null :
                            <View style={styles.container}>
                                {
                                    this.state.resourceData.detailImageUrl != null ?
                                        <Image source={{uri: this.state.resourceData.detailImageUrl}}
                                               style={styles.image}
                                               accessibilityLabel="图片加载中。。。"
                                               blurRadius={1}
                                               defaultSource={require('../../img/loading.gif')}
                                        />
                                        : null
                                }
                                <Text style={styles.title}>资源简介:{this.state.resourceData.productName}</Text>
                                <Text style={styles.text}>资源编号:{this.state.resourceData.productId}</Text>
                            </View>
                    }
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.cencelOrder} onPress={()=>{this._salesDiscontinuation()}}>
                        <Text style={styles.placeOrder_btn}
                        >下架</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cencelOrder} onPress={()=>{this._wechatShare()}}>
                        <Text style={styles.placeOrder_btn}
                        >分享</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            resourceData: this.props.selectResource
        })
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
    placeOrder: {//下单
        backgroundColor: '#3497FF',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    placeOrder_btn: {//下单按钮
        alignSelf: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    },
    cencelOrder: {
        backgroundColor: '#90EE90',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    }
});

export default ResourceDetail
