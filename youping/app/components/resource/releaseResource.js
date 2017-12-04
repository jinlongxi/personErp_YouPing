/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import Header from '../../containers/headerContainer';
import Util from '../../utils/util';
import InputScrollView from 'react-native-input-scroll-view';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
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
        this._selectPhotos = this._selectPhotos.bind(this);
        this._releaseResource = this._releaseResource.bind(this)
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
                console.log(response);
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
    _releaseResource() {
        this.props.releaseResource(this.state.avatarSource, this.state.text, this.state.productPrice);
        this.props.navigator.pop();
        console.log(this.props)
        this.props.showTabBar()
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        initObj={{backName: '返回', barTitle: '发布资源',backType: 'resource',refresh:true}}
                        navigator={this.props.navigator}/>
                </View>
                {
                    this.state.show ?
                        <View style={{flex: 1}}>
                            <View style={{flex: 1}}>
                                <TouchableOpacity onPress={()=> {
                                    this._selectPhotos()
                                }} style={styles.item_container}>
                                    {
                                        this.state.avatarSource == null ?
                                            <Image
                                                source={require('../../img/defaultImage.png')}/> :
                                            <Image source={this.state.avatarSource} style={styles.image}/>
                                    }
                                    <Text style={styles.uploadBtn}>点击上传资源</Text>
                                </TouchableOpacity>
                                <InputScrollView>
                                    <View style={styles.item_container}>
                                        <AutoGrowingTextInput
                                            placeholder='资源名称'
                                            style={styles.resourceName}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.text}
                                            multiline={true}
                                            keyboardType="default"
                                            returnKeyType="done"
                                            clearButtonMode="always"
                                            keyboardAppearance="dark"
                                            blurOnSubmit={true}
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
                                    <View style={styles.item_container}>
                                        <AutoGrowingTextInput
                                            placeholder='资源描述'
                                            style={styles.resourceDesc}
                                            multiline={true}
                                            keyboardType="default"
                                            returnKeyType="done"
                                            clearButtonMode="always"
                                            keyboardAppearance="dark"
                                            blurOnSubmit={true}
                                            keyboardShouldPersistTaps={true}
                                        />
                                    </View>
                                </InputScrollView>
                            </View>
                            <TouchableOpacity style={styles.item_container} onPress={()=> {
                                this._releaseResource()
                            }}>
                                <Text style={styles.releaseBtn}>发布资源</Text>
                            </TouchableOpacity>
                        </View>
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
        height: 150,
        width: 150,
        alignSelf: 'center',
        margin: 10
    },
    uploadBtn: {
        margin: 5
    },
    resourceName: {
        fontSize: 16,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2,
    },
    resourcePrice: {
        fontSize: 16,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2,
    },
    resourceDesc: {
        fontSize: 16,
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
