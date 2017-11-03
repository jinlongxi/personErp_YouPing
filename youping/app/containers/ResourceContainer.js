/**
 * Created by jinlongxi on 17/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResourceView from '../components/resource/ResourceView'
import {fetchResourceList, releaceResource, salesDiscontinuation} from '../actions/resource';
import * as WeChat from 'react-native-wechat';
import ServiceURL from '../utils/service'

const mapStateToProps = (state) => {
    return {
        resourceState: state.resourceStore
    }
};


const mapDispatchToProps = (dispatch)=> {
    //请求数据
    dispatch(fetchResourceList());
    return {
        //发布资源
        onclick: (picture, productName, productPrice)=> {
            dispatch(releaceResource(picture, productName, productPrice))
        },
        //资源详情
        goResourceDetail: ()=> {

        },
        //下架商品
        salesDiscontinuation: (productId)=> {
            dispatch(salesDiscontinuation(productId))
        },
        //微信分享
        wechatShare: (productId, picture, productName)=> {
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToSession({
                            title: '分享资源:' + productName,
                            description: '分享自:友评交易平台',
                            thumbImage: picture,
                            type: 'news',
                            webpageUrl: ServiceURL.WebManager + 'shareProduct?productId=' + productId

                        })
                            .catch((error) => {
                                console.log(error.message);
                            });

                    } else {
                        console.log('没有安装微信软件，请您安装微信之后再试');
                    }
                });
        }
    }
};

const ResourceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceView);
export default ResourceContainer
