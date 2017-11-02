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
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};


class ReleaseResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            text: null,
            productCategoryId: this.props.productCategoryId,
            sourceImage: null,
            productPrice: null,
            show: true
        };
        this._selectPhotos = this._selectPhotos.bind(this)
        this._releaseResourse = this._releaseResourse.bind(this)
    }

    //打开手机相册
    _selectPhotos() {
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
                let source = {uri: response.uri};
                // You can also display the image using data:
                //let sourceImage = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                    //sourceImage:sourceImage
                });
            }
        })
    }

    //发布资源
    _releaseResourse() {
        this.props.onClick(this.state.avatarSource, this.state.text, this.state.productPrice)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        initObj={{backName: '返回', barTitle: '发布资源'}}
                        navigator={this.props.navigator}/>
                </View>
                {
                    this.state.show ?
                        <ScrollView>
                            <TouchableOpacity onPress={this._selectPhotos} style={styles.item_container}>
                                {
                                    this.state.avatarSource == null ?
                                        <Image
                                            source={require('../../img/defaultImage.png')}/> :
                                        <Image source={this.state.avatarSource} style={styles.image}/>
                                }
                                <Text style={styles.uploadBtn}>点击上传资源</Text>
                            </TouchableOpacity>
                            <View style={styles.item_container}>
                                <TextInput
                                    placeholder='资源描述'
                                    style={styles.resourceDesc}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                    multiline={true}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    clearButtonMode="always"
                                    keyboardAppearance="dark"
                                    keyboardShouldPersistTaps={true}
                                />
                            </View>
                            <View style={styles.item_container}>
                                <TextInput
                                    placeholder='资源价格'
                                    style={styles.resourcePrice}
                                    onChangeText={(productPrice) => this.setState({productPrice})}
                                    value={this.state.productPrice}
                                    multiline={true}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    clearButtonMode="always"
                                    keyboardAppearance="dark"
                                    keyboardShouldPersistTaps={true}
                                />
                            </View>
                            <TouchableOpacity style={styles.item_container} onPress={this._releaseResourse}>
                                <Text style={styles.releaseBtn}>发布资源</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        : Util.loading
                }
            </View>
        );
    }

    componentWillMount() {
        console.log(this.props)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item_container: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 198,
        width: 300,
        alignSelf: 'center',
        margin: 10
    },
    uploadBtn: {
        margin: 5
    },
    resourceDesc: {
        fontSize: 16,
        height: 80,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2
    },
    resourcePrice: {
        fontSize: 16,
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2
    },
    releaseBtn: {
        backgroundColor: '#FFDA44',
        width: 300,
        textAlign: 'center',
        height: 40,
        paddingTop: 15
    }
});

export default ReleaseResource
