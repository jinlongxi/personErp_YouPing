/**
 * Created by jinlongxi on 18/2/8.
 */
import React, {Component} from 'react';
import ImagePickers from 'react-native-customized-image-picker';
import ImageList from '../common/imageList';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class uploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageArray: null
        }
    }

    render() {
        const {number, onClick}=this.props.initObj;
        return (
            <View>
                {
                    this.state.imageArray != null ?
                        <ImageList data={this.state.imageArray}/>
                        :
                        <TouchableOpacity style={styles.uploadImage_btn} onPress={()=> {
                            this._selectImages.bind(this, number, onClick)()
                        }}>
                            <Text style={styles.uploadImage_text}>上传+</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.initObj.initImage>0){
            this.setState({
                imageArray: nextProps.initObj.initImage
            })
        }
    }

    //选择手机中的图片
    _selectImages(number, onClick) {
        ImagePickers.openPicker({
            multiple: true,
            includeExif: true,
            maxFiles: number,
            loadingLabelText: '请稍等',
            useFrontCamera: true,
            compressImageQuality: 0.2,
            mediaType: 'photo',
        }).then(images => {
            const imageArray = [];
            for (var i = 0; i < images.length; i++) {
                let source = {uri: images[i].path};
                imageArray.push(source)
            }
            this.setState({
                imageArray: imageArray
            });
            onClick(imageArray)
        });
    }
}

const styles = StyleSheet.create({
    uploadImage_btn: {
        backgroundColor: '#CDC9C9',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    uploadImage_text: {
        fontSize: 16
    }
});

export default uploadImage
