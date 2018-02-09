/**
 * Created by jinlongxi on 18/2/7.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import SwitchButtons from '../common/switchButtons';
import UploadImage from '../common/uploadImage';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

class replyPriceView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {resource}=this.props;
        return (
            <View style={styles.container}>
                <Header initObj={{backName: '返回', barTitle: '回复询价', refresh: true}}
                        navigator={this.props.navigator}/>
                <ScrollView>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>买家信息=></Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{padding: 10}}>
                                <Image
                                    source={{uri: resource.custInfo.headPortrait + '?x-oss-process=image/resize,w_100,h_100/quality,q_50'}}
                                    style={styles.image}
                                    defaultSource={require('../../img/loading.gif')}
                                />
                                <Text style={styles.text}>{resource.custInfo.firstName}</Text>
                            </View>
                            <Text style={{fontSize: 30}}>===>>></Text>
                            <View style={{
                                padding: 10,
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={{uri: resource.productImage}}
                                    style={styles.image}
                                    defaultSource={require('../../img/loading.gif')}
                                />
                                <Text style={styles.text}>{resource.productName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>询价内容=></Text>
                        <Text style={styles.text}>已选特征=> {resource.featureDesc}</Text>
                        <Text style={styles.text}>询价备注=> {resource.reason}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.productDesc_text}>回复价格:</Text>
                        <AutoGrowingTextInput
                            placeholder='输入回复价格'
                            style={styles.productDesc_input}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            keyboardType="numeric"
                            returnKeyType="done"
                            clearButtonMode="always"
                            keyboardAppearance="dark"
                            blurOnSubmit={true}
                            keyboardShouldPersistTaps={true}
                            onChangeText={(text)=>this._setReplyPrice(text)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.productDesc_text}>回复备注:</Text>
                        <AutoGrowingTextInput
                            placeholder='输入备注'
                            style={styles.productDesc_input}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            keyboardType="default"
                            returnKeyType="done"
                            clearButtonMode="always"
                            keyboardAppearance="dark"
                            blurOnSubmit={true}
                            keyboardShouldPersistTaps={true}
                            onChangeText={(text)=>this._setReplyContent(text)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.productDesc_text}>下单必填内容:</Text>
                        <SwitchButtons initObj={{onClick: this._setCustomerInput.bind(this)}}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.productDesc_text}>微信收款码:</Text>
                        <UploadImage initObj={{number: 1, onClick: this._setQrCode.bind(this)}}/>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={()=> {
                    this._onSubmit()
                }}
                                  style={styles.btnContainer}>
                    <Text style={styles.btn_text}>确定回复</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //设置回复价格
    _setReplyPrice(text) {
        const {replyPriceActions}=this.props;
        replyPriceActions.setReplyPrice(text)
    }

    //设置回复备注内容
    _setReplyContent(text) {
        const {replyPriceActions}=this.props;
        replyPriceActions.setReplyContent(text)
    }

    //设置买家需填项
    _setCustomerInput(chooseData) {
        const typeArray = [];
        chooseData.map((item)=> {
            if (item.selected) {
                typeArray.push(item.id)
            }
        });
        const {replyPriceActions}=this.props;
        replyPriceActions.setCustomerInput(typeArray)
    }

    //设置收款二维码
    _setQrCode(image) {
        const {replyPriceActions}=this.props;
        replyPriceActions.setQrCode(image[0])
    }

    //提交回复询价
    _onSubmit() {
        const {productId, custRequestId, custPartyId}=this.props.resource;
        const {replyPrice, replyContent, typeArray, qrCode}=this.props.replyPriceStore;
        const {replyPriceActions}=this.props;
        replyPriceActions.replyRequestPrice(productId, replyPrice, replyContent, typeArray, qrCode, custRequestId, custPartyId)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textContainer: {
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
        alignItems: 'center',
        paddingVertical: 3
    },
    image: {
        width: 80,
        height: 80,
        borderColor: '#bbb',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 40,
    },
    productDesc_text: {
        fontSize: 18,
        color: '#8B475D',
        padding: 5
    },
    productDesc_input: {
        fontSize: 16,
        padding: 5,
        color: '#4a4a4a',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    btnContainer: {
        height: 50,
        backgroundColor: '#CD661D',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    btn_text: {
        color: '#ffffff',
        fontSize: 16
    },
});

export default replyPriceView
