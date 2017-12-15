/**
 * Created by jinlongxi on 17/12/8.
 */
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
            theme_image: null
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    initObj={{backName: '返回', barTitle: '创建资源'}}
                    navigator={this.props.navigator}
                />
                <ScrollView
                    style={styles.body}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Image style={styles.theme_image}
                           resizeMode='cover'
                           source={{uri: 'http://personerp.oss-cn-hangzhou.aliyuncs.com/datas/product_img/TIM%E5%9B%BE%E7%89%8720171208143848.jpg'}}/>
                    <Text style={styles.theme_Desc}>
                        “儿子与他的滑板车”
                    </Text>
                    <Text style={styles.author}>
                        作者：金龙熙
                    </Text>
                    <View style={styles.hr}></View>
                    <Text style={styles.main_text}>儿子两岁生日的那一天，孩子妈给他买了一辆黑色的帅客牌滑板车作为礼物送，开始他不敢上，在妈妈的帮助下，壮着胆子双手扶住车把，试着把右脚踩到车板上，并用力地将左脚在地面上一蹬。但没想到，啪地一声他连人带车一起摔到了地上，我害怕极了，怕他摔到哪里，但没想到，他立马站了起来，扶起车子继续滑了起来。后来又摔了几跤，不过在绕喷泉周围骑了几圈以后，慢慢地可以很流畅的滑行了！</Text>
                    <Image style={styles.second_image}
                           resizeMode='center'
                           source={{uri: 'http://personerp.oss-cn-hangzhou.aliyuncs.com/datas/product_img/TIM%E5%9B%BE%E7%89%8720171208143854.jpg'}}/>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        height: 1500,
        margin: 15,
        backgroundColor: '#fff'
    },
    //头部图片
    theme_image: {
        width: Util.windowSize.width - 30,
        height: 425,
    },
    //头部描述
    theme_Desc: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 20,
        lineHeight: 32
    },
    //作者
    author: {
        lineHeight: 28,
        color: 'rgb(62, 62, 62)',
        fontSize: 16,
        backgroundColor: 'rgb(250,250,250)',
        textAlign: 'left',
    },
    //分割线
    hr: {
        borderWidth: 0.5,
        marginVertical: 8
    },
    //主要描述
    main_text: {
        marginVertical: 20,
        lineHeight: 28,
        fontSize: 16,
    },
    //第二张图片
    second_image: {
        width: Util.windowSize.width - 30,
        height: 283,
    },
});

export default ReleaseResource
