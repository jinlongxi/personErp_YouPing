/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import releaseProductImage from './releaseProductImage';
import AddOption from './addOption';
import ImageList from '../common/imageList';
import ImagePickers from 'react-native-image-crop-picker';
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
    Switch,
    DeviceEventEmitter
} from 'react-native';

class ReleaseProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            productName: null,
            productDesc: null,
            productCategoryId: this.props.productCategoryId,
            sourceImage: null,
            productPrice: 0,
            quantityTotal: 99999,
            show: true,
            radioSelect: false,
            isVisible: false,
            productFeatures: [],
            aboutImages: null,
            chooseData: [
                {id: 1, text: '收货地址', selected: true},
                {id: 2, text: '联系方式', selected: false},
                {id: 3, text: '购买数量', selected: false},
                {id: 4, text: '添加备注', selected: false},
                {id: 5, text: '特征必填', selected: false},
                {id: 6, text: '需先付款', selected: false}
            ]
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        initObj={{backName: '返回', barTitle: '发布资源', backType: 'resource', refresh: true}}
                        navigator={this.props.navigator}/>
                </View>
                <ScrollView style={{padding: 10}}>
                    <View style={styles.productDescContainer}>
                        <Text style={styles.productDesc_text}>标题:</Text>
                        <AutoGrowingTextInput
                            placeholder='输入资源标题'
                            style={styles.productName_input}
                            onChangeText={(text) => this.setState({productName: text})}
                            value={this.state.text}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            keyboardType="default"
                            returnKeyType="done"
                            clearButtonMode="always"
                            keyboardAppearance="dark"
                            blurOnSubmit={true}
                            keyboardShouldPersistTaps={true}
                        />
                    </View>
                    <View style={styles.productDescContainer}>
                        <Text style={styles.productDesc_text}>描述:</Text>
                        <AutoGrowingTextInput
                            placeholder='输入资源品述'
                            style={styles.productDesc_input}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({productDesc: text})}
                            keyboardType="default"
                            returnKeyType="done"
                            clearButtonMode="always"
                            keyboardAppearance="dark"
                            blurOnSubmit={true}
                            keyboardShouldPersistTaps={true}
                        />
                    </View>
                    <View style={styles.productDescContainer}>
                        <Text style={styles.productDesc_text}>图片(至少一张):</Text>
                        {
                            this.state.aboutImages !== null ?
                                <ImageList data={this.state.aboutImages}/>
                                :
                                <TouchableOpacity style={styles.productAbout_Image} onPress={()=>this._selectImages()}>
                                    <Text style={styles.upload}>上传+</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.radio}>
                        <Switch disabled={false} value={this.state.radioSelect} onValueChange={()=> {
                            this.setState({radioSelect: !this.state.radioSelect})
                        }}/>
                        <Text style={styles.radio_text}>高级选项</Text>
                    </View>
                    {
                        this.state.radioSelect ?
                            <View >
                                <View style={styles.productDescContainer}>
                                    <Text style={styles.productDesc_text}>价格:</Text>
                                    <AutoGrowingTextInput
                                        placeholder='输入资源价格'
                                        style={styles.productDesc_input}
                                        multiline={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({productPrice: text})}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        clearButtonMode="always"
                                        keyboardAppearance="dark"
                                        blurOnSubmit={true}
                                        keyboardShouldPersistTaps={true}
                                    />
                                </View>
                                <View style={styles.productDescContainer}>
                                    <Text style={styles.productDesc_text}>库存:</Text>
                                    <AutoGrowingTextInput
                                        placeholder='输入资源数量'
                                        style={styles.productDesc_input}
                                        multiline={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({quantityTotal: text})}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        clearButtonMode="always"
                                        keyboardAppearance="dark"
                                        blurOnSubmit={true}
                                        keyboardShouldPersistTaps={true}
                                    />
                                </View>
                                <View style={[styles.productDescContainer]}>
                                    <Text style={styles.productDesc_text}>特征:</Text>
                                    <TouchableOpacity style={styles.addOptions_btn} onPress={()=>this.setState({
                                        isVisible: true
                                    })}>
                                        <Text style={styles.addOptions_text}>添加+</Text>
                                    </TouchableOpacity>
                                    {
                                        this.state.productFeatures.length > 0 ?
                                            this.state.productFeatures.map((item, index)=> {
                                                return (
                                                    <View key={item[0].optionTitle + index} style={{
                                                        borderColor: '#bbb',
                                                        borderWidth: StyleSheet.hairlineWidth,
                                                        borderRadius: 2,
                                                        padding: 5,
                                                        marginVertical: 5
                                                    }}>
                                                        <Text style={{color: 'black'}}>特征项：{item[0].optionTitle}</Text>
                                                        <View style={{
                                                            borderColor: '#bbb',
                                                            borderRadius: 2,
                                                            padding: 5,
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            flexWrap: 'wrap',

                                                        }}>
                                                            {
                                                                item[0].optionList.map((data, index)=> {
                                                                    return (
                                                                        <Text key={data.value + index + 1} style={{
                                                                            color: 'black',
                                                                            borderWidth: StyleSheet.hairlineWidth,
                                                                            padding: 5,
                                                                            marginVertical: 5
                                                                        }}>{data.value}</Text>

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
                                <View style={styles.productDescContainer}>
                                    <Text style={styles.productDesc_text}>买家必填:</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor: '#ddd'
                                    }}>
                                        {
                                            this.state.chooseData.map((item, index)=> {
                                                return (
                                                    <TouchableOpacity key={item.id} style={[{
                                                        borderWidth: StyleSheet.hairlineWidth,
                                                        borderColor: '#ddd',
                                                        padding: 10,
                                                        margin: 10
                                                    },
                                                        {backgroundColor: item.selected ? '#8968CD' : '#F2F2F2'}]}
                                                                      onPress={()=> {
                                                                          this.state.chooseData[index].selected = !this.state.chooseData[index].selected
                                                                          this.setState({
                                                                              chooseData: this.state.chooseData
                                                                          })
                                                                      }}
                                                    >
                                                        <Text>{item.text}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View> : null
                    }

                </ScrollView>
                <TouchableOpacity onPress={()=> {
                    this._nextPage()
                }}
                                  style={styles.btnContainer}>
                    <Text style={styles.next_btn}>发布</Text>
                </TouchableOpacity>
                <AddOption isVisible={this.state.isVisible} {...this.props}/>
            </View>
        );
    }

    //选择多张图片
    _selectImages() {
        ImagePickers.openPicker({
            cropping: true,
            multiple: true,
            includeExif: true,
            maxFiles: 9,
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
                aboutImages: imageArray
            });
        });
    }

    //nextPage
    _nextPage() {
        if (this.state.productName == null || this.state.productDesc == null) {
            alert('信息不完整')
        } else {
            //发布产品
            this.props.releaseResource(this.state.aboutImages, this.state.productName, this.state.productDesc, this.state.productPrice, this.state.quantityTotal, this.state.productFeatures)
            this.props.showTabBar();
            this.props.navigator.popToTop();
        }
    }

    componentDidMount() {
        //注意addListener的key和emit的key保持一致
        this.msgListener = DeviceEventEmitter.addListener('Msg', (option) => {
            const optionList = this.state.productFeatures;
            optionList.push(option);
            this.setState({
                productFeatures: optionList,
                isVisible: false
            })
        });
        this.hiddenListener = DeviceEventEmitter.addListener('hiddenModel', (option) => {
            if (option) {
                this.setState({
                    isVisible: false
                })
            }
        });
    }

    componentWillUnmount() {
        //此生命周期内，去掉监听
        this.msgListener && this.msgListener.remove();
        this.hiddenListener && this.hiddenListener.remove();
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
    productName_input: {
        fontSize: 16,
        padding: 5,
        color: '#4a4a4a',
    },
    //产品描述
    productDesc_text: {
        fontSize: 18,
        color: '#8B475D',
        padding: 5
    },
    productDesc_input: {
        fontSize: 16,
        padding: 5,
        color: '#4a4a4a',
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
    },
    //高级选项
    radio: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radio_text: {
        fontSize: 16,
        textAlignVertical: 'center',
        marginLeft: 10
    },
    //添加选项
    addOptions_btn: {
        backgroundColor: '#CDC9C9',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },
    addOptions_text: {
        fontSize: 16
    },
    //产品描述
    productDescContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        paddingVertical: 10
    },
    productAbout_Image: {
        backgroundColor: '#CDC9C9',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
});

export default ReleaseProduct
