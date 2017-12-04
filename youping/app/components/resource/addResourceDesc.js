/**
 * Created by jinlongxi on 17/11/13.
 */
/**
 * Created by jinlongxi on 17/11/13.
 */
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageList from '../common/imageList';
import Util from '../../utils/util';
import Header from '../common/header';
import InputScrollView from 'react-native-input-scroll-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ReactNative
} from 'react-native';

class AddResourceDesc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            text: null
        };
        this._selectImages = this._selectImages.bind(this);
        this._complete = this._complete.bind(this);
    }

    //选择多张图片
    _selectImages() {
        ImagePicker.openPicker({
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
                images: imageArray
            });
        });
    }

    //提交完善信息
    _complete() {
        const productId = this.props.selectResource.productId;
        const images = this.state.images;
        this.props.addResourceDesc(images, this.state.text, productId);
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    initObj={{backName: '返回', barTitle: '完善信息'}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    <View style={styles.pictureArea}>
                        <TouchableOpacity style={styles.uploadImage_btn} onPress={()=>this._selectImages()}>
                            <Text>上传多张图片</Text>
                        </TouchableOpacity>
                        {
                            this.state.images.length > 0 ?
                                <View>
                                    <ImageList data={this.state.images}/>
                                    <View style={styles.add_desc_container}>
                                        <TextInput
                                            placeholder='添加描述'
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
                                </View>
                                : null
                        }
                    </View>
                </ScrollView>
                <View style={styles.doneView}>
                    <TouchableOpacity style={styles.done_btn} onPress={()=>this._complete()}>
                        <Text>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentWillMount() {
        console.log(this.props)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //上传多张图片按钮
    uploadImage_btn: {
        backgroundColor: '#90EE90',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    //照片区域
    pictureArea: {
        width: Util.windowSize.width,
        marginTop: 30,
    },
    //表单区域
    formArea: {
        width: Util.windowSize.width,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30,
    },
    formTitle: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 16,
    },
    textInput: {
        flex: 1,
        borderWidth: 0,
        fontSize: 16,
        paddingLeft: 16,
        height: 50,
    },
    //完成提交区域
    doneView: {
        width: Util.windowSize.width,
    },
    done_btn: {
        backgroundColor: '#EE6A50',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    //添加描述
    add_desc_container: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resourceDesc: {
        fontSize: 16,
        height: 80,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2
    },
});

export default AddResourceDesc
