/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import Header from '../common/header';
import Util from '../../utils/util';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    AsyncStorage,
    ScrollView
} from 'react-native';

//图片选择器参数设置
var options = {
    title: '请选择图片来源',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    allowsEditing: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};

class paymentMethods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aliPayQrCode: null,
            weChatQrCode: null,
            loading: false
        };
        this._selectPhotos = this._selectPhotos.bind(this);
    }

    //打开手机相册
    _selectPhotos(type) {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }
            else {
                let source = response.uri;
                if (type === 'ALIQRCODE') {
                    this.props.PaymentMethods(source, type);
                    this.setState({
                        aliPayQrCode: source,
                    })
                } else {
                    this.props.PaymentMethods(source, type);
                    this.setState({
                        weChatQrCode: source,
                    })
                }
            }
        })
    }

    render() {
        const aliPayQrCode = this.state.aliPayQrCode;
        const weChatQrCode = this.state.weChatQrCode;
        const loading = this.state.loading;
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        initObj={{backName: '返回', barTitle: '收款方式'}}
                        navigator={this.props.navigator}/>
                </View>
                {
                    loading ?
                        <ScrollView>
                            <TouchableOpacity onPress={()=> {
                                this._selectPhotos('ALIQRCODE')
                            }} style={styles.item_container}>
                                {
                                    aliPayQrCode == null ?
                                        <Image source={require('../../img/paymentMethod/aliPay.jpg')}
                                               style={styles.image}/> :
                                        <Image source={{uri: aliPayQrCode}} style={styles.image}/>
                                }
                                <Text style={styles.uploadBtn}>点击上传支付包二维码</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this._selectPhotos('WECHATQRCODE')
                            }} style={styles.item_container}>
                                {
                                    weChatQrCode == null ?
                                        <Image source={require('../../img/paymentMethod/weChat.jpg')}
                                               style={styles.image}/> :
                                        <Image source={{uri: weChatQrCode}} style={styles.image}/>
                                }
                                <Text style={styles.uploadBtn}>点击上传微信二维码</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        : Util.loading
                }
            </View>
        );
    }

    componentWillMount() {
        this.setState({
            aliPayQrCode: this.props.aboutState.myInfo.aliPayQrCode,
            weChatQrCode: this.props.aboutState.myInfo.weChatQrCode,
            loading: this.props.aboutState.isLoading
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item_container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        margin: 10
    },
    uploadBtn: {
        margin: 5
    },
});

export default paymentMethods
