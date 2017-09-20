/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import ServiceURl from '../common/service';
import Request from '../common/request';
import DeviceStorage from '../common/deviceStorage';
import HomeList from '../home/homeList';
import Util from '../common/util';
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


class CompleteInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            text: null,
            productCategoryId: null,
            sourceImage: null,
            productPrice: null,
            show: true
        };
        this._selectPhotos = this._selectPhotos.bind(this)
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
    _completeInfo() {
        this.setState({
            show: false
        });
        DeviceStorage.get('tarjeta').then((tags) => {
                let url = ServiceURl.personManager + 'updatePersonInfo?tarjeta=' + tags + '&firstName=' + this.state.text+'&gender'+'M';
                console.log("完善资料URL:" + url);
                let data = [];
                let that = this;
                data.push(this.state.avatarSource);
                console.log(data);
                Request.uploadImage(url, data, function (response) {
                    console.log(JSON.stringify(response));
                    let {code:code}=response;
                    if (code === '200') {
                        that.setState({
                            show: true
                        });
                        const {navigator} = that.props;
                        if (navigator) {
                            navigator.push({
                                name: 'HomeList',
                                component: HomeList,
                                params: {},
                            })
                        }
                    }
                }, function (err) {
                    console.log(JSON.stringify(err))
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                   <Text style={styles.header_title}>完善资料</Text>
                </View>
                {
                    this.state.show ?
                        <ScrollView>
                            <TouchableOpacity onPress={this._selectPhotos} style={styles.item_container}>
                                {
                                    this.state.avatarSource == null ?
                                        <Image
                                            source={require('../img/contact/upLoad.png')}/> :
                                        <Image source={this.state.avatarSource} style={styles.image}/>
                                }
                                <Text style={styles.uploadBtn}>点击上传头像</Text>
                            </TouchableOpacity>
                            <View style={styles.item_container}>
                                <TextInput
                                    placeholder='姓名'
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
                            <TouchableOpacity style={styles.item_container} onPress={this._completeInfo.bind(this)}>
                                <Text style={styles.releaseBtn}>完善资料</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        : Util.loading
                }
            </View>
        );
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
        height: 40,
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
    },
    header:{
        height:44,
        backgroundColor:'yellow',
        paddingTop:20
    },
    header_title:{
        color:'#1d1d1d',
        textAlign:'center',
        fontSize:18
    }
});

export default CompleteInformation
