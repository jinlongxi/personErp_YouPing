/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import ImagePicker from 'react-native-image-picker';
import ImagePickers from 'react-native-image-crop-picker';
import ImageList from '../common/imageList';
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
    ScrollView,
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


class ReleaseProductImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainImage: null,
            aboutImages: null,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        initObj={{backName: '返回', barTitle: '添加图片', backType: 'resource', refresh: true}}
                        navigator={this.props.navigator}/>
                </View>
                <ScrollView style={{padding: 10}}>
                    <View style={styles.productNameContainer}>
                        <Text style={styles.productName_text}>产品封面(必填):</Text>
                        {
                            this.state.mainImage == null ? <TouchableOpacity style={styles.productMain_Image}
                                                                             onPress={()=>this._uploadMainImage()}>
                                <Text style={styles.upload}>上传+</Text>
                            </TouchableOpacity> :
                                <Image source={this.state.mainImage} style={styles.image}/>
                        }

                    </View>
                    <View style={styles.productDescContainer}>
                        <Text style={styles.productDesc_text}>相关图片(必填最少一张):</Text>
                        {
                            this.state.aboutImages !== null ?
                                <ImageList data={this.state.aboutImages}/>
                                :
                                <TouchableOpacity style={styles.productAbout_Image} onPress={()=>this._selectImages()}>
                                    <Text style={styles.upload}>上传+</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={()=> {
                    this._releaseProduct()
                }}
                                  style={styles.btnContainer}>
                    <Text style={styles.next_btn}>发布</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //点击上传封面图片
    _uploadMainImage() {
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
                console.log(response);
                let source = {uri: response.uri};
                // You can also display the image using data:
                //let sourceImage = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    mainImage: source,
                });
            }
        })
    }

    //选择多张图片
    _selectImages() {
        ImagePickers.openPicker({
            cropping: true,
            multiple: true,
            includeExif: true,
            maxFiles: 4,
            loadingLabelText: '请稍等',
            showsSelectedCount: true,
            useFrontCamera: true,
            compressImageQuality: 0.2
        }).then(images => {
            const imageArray = [];
            for (var i = 0; i < images.length; i++) {
                let source = {uri: images[i].path};
                imageArray.push(source)
            }
            this.setState({
                aboutImages: imageArray
            });
        });
    }

    //发布产品
    _releaseProduct() {
        let images = this.state.aboutImages;
        images.unshift({uri: this.state.mainImage.uri});
        this.props.releaseResource(images, this.props.productName, this.props.productDesc);
        this.props.showTabBar()
        this.props.navigator.popToTop()
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
    image: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        margin: 10
    },
    //产品名称
    productNameContainer: {
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0'
    },
    productName_text: {
        fontSize: 18,
        color: '#4a4a4a',
        padding: 5,
    },
    productMain_Image: {
        backgroundColor: '#CDC9C9',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //上传字体
    upload: {
        fontSize: 20,
        color: 'white'
    },
    //产品描述
    productDescContainer: {},
    productDesc_text: {
        fontSize: 18,
        color: '#4a4a4a',
        padding: 5
    },
    productAbout_Image: {
        backgroundColor: '#CDC9C9',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
    //下一步按钮
    btnContainer: {
        height: 50,
        backgroundColor: '#CD661D',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    next_btn: {
        color: '#ffffff',
        fontSize: 16
    }

});

export default ReleaseProductImage
