/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResourceView from '../components/resource/resourceView'
import {
    fetchResourceList,
    releaseResource,
    salesDiscontinuation,
    addProductContent,
    spreadProduct,
    queryCustSalesReport,
    queryProductFeatures
} from '../actions/resource';
import {hideTabBar, showTabBar} from '../actions/tab'
import * as WeChat from 'react-native-wechat';
import ServiceURL from '../utils/service';
import {
    Alert,
    Platform
} from 'react-native'

const mapStateToProps = (state) => {
    return {
        resourceState: state.resourceStore
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //请求订单列表数据
        getResourceList: ()=> {
            dispatch(fetchResourceList());
        },
        //发布资源
        releaseResource: (picture, productName, productDesc, productPrice, quantityTotal,productFeatures)=> {
            console.log(picture, productName, productDesc, productPrice, quantityTotal,productFeatures);
            dispatch(releaseResource(picture, productName, productDesc, productPrice, quantityTotal,productFeatures))
        },
        //下架商品
        salesDiscontinuation: (productId)=> {
            Platform.OS == 'ios' ? Alert.alert('下架资源', '是否确定？', [{text: '取消'}, {
                text: '确定',
                onPress: () => dispatch(salesDiscontinuation(productId))
            }]) : Alert.alert('下架资源', '是否确定？', [{text: '确定'}])
        },
        //发送推广消息
        spreadProduct: (productId, text, roleTypeId)=> {
            dispatch(spreadProduct(productId, text, roleTypeId))
        },
        //微信分享
        weChatShare: (productId, picture, productName, payToPartyId, description)=> {
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToSession({
                            title: '分享资源:' + productName,
                            description: description == null ? '谢谢使用' : description,
                            thumbImage: picture,
                            type: 'news',
                            webpageUrl: ServiceURL.WebManager + 'myStory?productId=' + productId + '&payToPartyId=' + payToPartyId
                        })
                            .catch((error) => {
                                console.log(error.message);
                            });

                    } else {
                        console.log('没有安装微信软件，请您安装微信之后再试');
                    }
                });
        },
        //完善资料
        addResourceDesc: (images, description, productId)=> {
            dispatch(addProductContent(images, description, productId));
        },
        //隐藏TAB
        hiddenTabBar: ()=> {
            dispatch(hideTabBar())
        },
        //显示TAB
        showTabBar: ()=> {
            dispatch(showTabBar())
        },
        //查询客户关系，浏览记录详情列表
        queryCustSalesReport:(productId)=>{
            console.log(productId)
            dispatch(queryCustSalesReport(productId))
        },
        //查询资源特征信息
        queryProductFeatures:(productId)=>{
            dispatch(queryProductFeatures(productId))
        }
    }
};

const ResourceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceView);
export default ResourceContainer
