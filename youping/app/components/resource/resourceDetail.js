/**
 * Created by jinlongxi on 17/9/15.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import ImageList from '../common/imageList';
import DeciveStorage from '../../utils/deviceStorage';
import Modal from 'react-native-modal';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Banner from 'react-native-banner';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Grid from './gridFriend';
import Request from '../../utils/request';
import ServiceURl from '../../utils/service';
import NestedListview, {NestedRow} from 'react-native-nested-listview'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Platform,
    InteractionManager
} from 'react-native';

const Page = ({label}) => (
    <Grid data={label}/>
);

const data = [
    {
        title: '龙熙(转发9次)',
        items: [{
            title: '小沈(转发7次)',
            items: [{title: '冯总(转发2次)'}, {title: '小明(转发0次)'}, {title: '红红(转发1次)'}, {title: '啦啦(转发0次)'}]
        }, {title: '童总(转发2次)'}]
    },
    {
        title: '小董(转发6次)',
        items: [{title: '小沈(转发3次)', items: [{title: '冯总(转发2次)'}]}, {title: '童总(转发3次)'}, {title: '啊啊(转发0次)'}]
    },
    {title: '峰哥(转发0次)'},
    {title: '东东(转发3次)', items: [{title: '小沈(转发0次)', items: [{title: '冯总(转发0次)'}]}, {title: '童总(转发0次)'}]}
];

class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);
        this._weChatShare = this._weChatShare.bind(this);
        this.state = {
            isModalVisible: false,
            shareInfo: null,
            clickTitle: 'You can try clicking beauty',
            defaultIndex: 1,
            custList: null,
            visitorList: null,
            placingCustList: null,
            partnerList: null,
            productFeaturesList: null
        };
        this._toggleModal = this._toggleModal.bind(this);
        this.iosMarginTop = Platform.OS == 'ios' ? {marginTop: 10, flex: 1} : {width: '100%'};
        this.banners = null
    }

    //微信分享模态框
    _toggleModal() {
        this.setState({isModalVisible: !this.state.isModalVisible});
        const that = this;
        DeciveStorage.get('partyId').then((partyId)=> {
            that.props.weChatShare(that.props.selectResource.productId,
                that.props.selectResource.detailImageUrl,
                that.props.selectResource.productName, partyId, that.state.shareInfo)
        });
    }

    //微信分享
    _weChatShare() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    }

    //监听滑块点击事件
    clickListener(index) {
        this.setState({
            clickTitle: this.banners[index].title ? `you click ${this.banners[index].title}` : 'this banner has no title',
        })
    }

    //监听滑块事件
    onMomentumScrollEnd(event, state) {
        console.log(`--->onMomentumScrollEnd page index:${state.index}, total:${state.total}`);
        this.setState({
            defaultIndex: state.index
        })
    }

    //客户关系列表颜色枚举(根据颜色设置不同层级背景颜色)
    _partnerListColor(level) {
        switch (level) {
            case 1: {
                return '#BCD2EE'
            }
            case 2: {
                return '#8FBC8F'
            }
            case 3: {
                return '#C1CDCD'
            }
        }
    }

    render() {
        const resourceData = this.props.selectResource;
        const loading = this.props.resourceState.isLoading;
        return (
            loading ?
                <View style={{flex: 1}}>
                    <Header
                        initObj={{
                            backName: '返回',
                            barTitle: resourceData.productName,
                            backType: 'resource',
                            refresh: true
                        }}
                        navigator={this.props.navigator}
                    />
                    <ScrollView>
                        {
                            <View style={styles.container}>
                                <View style={this.iosMarginTop}>
                                    <Banner
                                        banners={this.banners}
                                        defaultIndex={this.state.defaultIndex}
                                        onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
                                        intent={this.clickListener.bind(this)}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>资源简介=></Text>
                                    <Text style={styles.text}>资源编号:{resourceData.productId}</Text>
                                    <Text style={styles.text}>价格:{resourceData.price || '未设置'}</Text>
                                    <Text style={styles.text}>数量:{resourceData.kuCun || '未设置'}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>资源描述=></Text>
                                    <Text style={styles.text}>{resourceData.description}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>资源特征=></Text>
                                    {
                                        this.state.productFeaturesList != null ?
                                            this.state.productFeaturesList.map((item, index)=> {
                                                let optionTitle = Object.keys(item);
                                                let optionList = Object.values(item);
                                                console.log(optionTitle, optionList);
                                                return (
                                                    <View key={optionTitle[0] + index} style={{
                                                        borderWidth: StyleSheet.hairlineWidth,
                                                        borderColor: '#bbb',
                                                        margin: 10,
                                                        paddingVertical: 5,
                                                        width: '100%'
                                                    }}>
                                                        <Text
                                                            style={[styles.text, {color: '#EEB422'}]}>特征项:{optionTitle[0]}</Text>
                                                        <View style={{
                                                            borderColor: '#bbb',
                                                            borderRadius: 2,
                                                            padding: 5,
                                                            margin: 5,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            flexWrap: 'wrap'
                                                        }}>
                                                            {
                                                                optionList[0].map((data)=> {
                                                                    return (
                                                                        <Text key={data + index + 1}
                                                                              style={{
                                                                                  color: 'black',
                                                                                  borderWidth: StyleSheet.hairlineWidth,
                                                                                  padding: 5,
                                                                              }}>{data}</Text>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                )
                                            })
                                            : null
                                    }
                                </View>
                                <View style={[styles.textContainer, {paddingVertical: 0}]}>
                                    <Text style={styles.title}>客户列表=></Text>
                                </View>
                                <View style={{flex: 1, margin: 10}}>
                                    <NestedListview
                                        data={data}
                                        getChildrenName={(node) => 'items'}
                                        onNodePressed={(node) => console.log('点击了：' + node.title)}
                                        renderNode={(node, level) => (
                                            <NestedRow
                                                level={level}
                                                style={{
                                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    backgroundColor: this._partnerListColor(level),
                                                }}
                                            >
                                                <Text>{level}级 </Text>
                                                <Image style={styles.imageContact}
                                                       source={{uri: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbXh3vd3I57rnNWlwyhXk6TtWa7rP90lQbTP4zu4iaiboGq21996ftQLWY1zYxp1R49U5NZqnZ36Ww/132'}}/>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                    paddingRight: 15
                                                }}>
                                                    <Text>{node.title}</Text>
                                                    <Text>下一级客户数:{node.items != null ? node.items.length : 0}</Text>
                                                </View>
                                            </NestedRow>
                                        )}
                                    />
                                </View>
                                {/*<View style={{flex: 1, height: 500}}>*/}
                                {/*<ScrollableTabView*/}
                                {/*tabBarActiveTextColor="#53ac49"*/}
                                {/*renderTabBar={() => <TabBar underlineColor="#53ac49"/>}>*/}
                                {/*<Page tabLabel={{*/}
                                {/*label: "浏览客户",*/}
                                {/*badge: this.state.visitorList != null ? this.state.visitorList.length : 0*/}
                                {/*}}*/}
                                {/*label={this.state.visitorList}/>*/}
                                {/*<Page tabLabel={{*/}
                                {/*label: "潜在客户",*/}
                                {/*badge: this.state.placingCustList != null ? this.state.placingCustList.length : 0*/}
                                {/*}}*/}
                                {/*label={this.state.placingCustList}/>*/}
                                {/*<Page tabLabel={{*/}
                                {/*label: "转发客户",*/}
                                {/*badge: this.state.partnerList != null ? this.state.partnerList.length : 0*/}
                                {/*}}*/}
                                {/*label={this.state.partnerList}/>*/}
                                {/*<Page tabLabel={{*/}
                                {/*label: "实际客户",*/}
                                {/*badge: this.state.custList != null ? this.state.custList.length : 0*/}
                                {/*}}*/}
                                {/*label={this.state.custList}/>*/}
                                {/*</ScrollableTabView>*/}
                                {/*</View>*/}
                            </View>
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <Modal style={styles.modal} isVisible={this.state.isModalVisible}>
                            <View style={styles.modalContainer}>
                                <View style={styles.InputView}>
                                    <AutoGrowingTextInput
                                        placeholder='请输入分享信息'
                                        style={styles.modalInput}
                                        multiline={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({shareInfo: text})}
                                        keyboardType="default"
                                        returnKeyType="done"
                                        clearButtonMode="always"
                                        keyboardAppearance="dark"
                                        blurOnSubmit={true}
                                        keyboardShouldPersistTaps={true}
                                    />
                                </View>
                                <TouchableOpacity style={styles.moving} onPress={this._toggleModal}>
                                    <Text style={styles.footer_btn_text}>分享</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <TouchableOpacity style={styles.moving} onPress={()=> {
                            this._weChatShare()
                        }}>
                            <Text style={styles.footer_btn_text}>微信分享</Text>
                        </TouchableOpacity>
                    </View>
                </View> : Util.isLoading
        )
    }

    //查询客户信息列表
    queryCustSalesReport(productId) {
        const that = this;
        let url = ServiceURl.personManager + 'queryCustSalesReport';
        let data = '&productId=' + productId;
        Request.postRequest(url, data, function (response) {
            console.log('查询客户关系，浏览记录详情列表' + JSON.stringify(response));
            let {custList:custList, visitorList:visitorList, placingCustList:placingCustList, partnerList:partnerList}=response;
            that.setState({
                custList: custList,
                visitorList: visitorList,
                placingCustList: placingCustList,
                partnerList: partnerList
            })
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    }

    //查询资源特征信息
    queryProductFeatures(productId) {
        const that = this;
        let url = ServiceURl.personManager + 'queryProductFeatures';
        let data = '&productId=' + productId;
        Request.postRequest(url, data, function (response) {
            console.log('查询资源特征信息' + JSON.stringify(response));
            let {productFeaturesList:productFeaturesList}=response;
            console.log(productFeaturesList);
            that.setState({
                productFeaturesList: productFeaturesList
            })
        }, function (err) {
            console.log(JSON.stringify(err))
        })
    }

    componentWillMount() {
        const imageList = [];
        imageList.push({
            title: this.props.selectResource.productId,
            image: this.props.selectResource.detailImageUrl,
        });
        const selectResource = this.props.selectResource.morePicture;
        selectResource.map((item, index)=> {
            imageList.push({
                title: item.productId,
                image: item.drObjectInfo,
            });
        });
        this.banners = imageList;
    }

    componentDidMount() {
        this.queryCustSalesReport(this.props.selectResource.productId);
        this.queryProductFeatures(this.props.selectResource.productId);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    textContainer: {
        width: '90%',
        padding: 20,
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
    imageContact: {
        width: 30,
        height: 30,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        borderRadius: 2,
        marginRight: 10
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
    //底部
    footer: {
        flexDirection: 'row',
        width: Util.windowSize.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptying: {
        flex: 1,
        backgroundColor: '#FFAEB9'
    },
    moving: {
        flex: 1,
        backgroundColor: '#28a745',
    },
    footer_btn_text: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },

    //模态框
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: "90%",
        height: "50%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    InputView: {
        height: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom: 5
    },
    modalInput: {
        fontSize: 16,
        padding: 5,
        color: '#4a4a4a',
    },

});

export default ResourceDetail
