/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ResourceAddFeature from './resourceAddFeature';
import ImageList from '../common/imageList';
import ImagePickers from 'react-native-customized-image-picker';
import UploadImage from '../common/uploadImage';
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
            isVisible: false,
            productFeatures: [],
        };
    }

    render() {
        const {resourceReleaseActions}=this.props;
        const {
            resourceName,
            resourceImages,
            resourceAdvancedOptions,
            showFeaturesModel
        }=this.props.resourceReleaseStore;
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
                            onChangeText={(text) => resourceReleaseActions.setResourceName(text)}
                            value={resourceName}
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
                        <Text style={styles.productDesc_text}>图片(至少一张):</Text>
                        {
                            resourceImages.length > 0 ?
                                <ImageList data={resourceImages}/>
                                : <UploadImage
                                initObj={{
                                    number: 9,
                                    onClick: this._selectImages.bind(this)
                                }}/>
                        }
                    </View>
                    <View style={styles.radio}>
                        <Switch disabled={false} value={resourceAdvancedOptions} onValueChange={(boolean)=> {
                            resourceReleaseActions.setResourceAdvancedOptions(boolean)
                        }}/>
                        <Text style={styles.radio_text}>高级选项</Text>
                    </View>
                    {
                        resourceAdvancedOptions ? this._renderAdvancedOptions() : null
                    }
                </ScrollView>
                <TouchableOpacity onPress={()=> {
                    this._resourceRelease()
                }}
                                  style={styles.btnContainer}>
                    <Text style={styles.next_btn}>发布</Text>
                </TouchableOpacity>
                <ResourceAddFeature isVisible={showFeaturesModel} {...this.props}/>
            </View>
        );
    }

    //渲染高级选项
    _renderAdvancedOptions() {
        const {resourceReleaseActions}=this.props;
        const {
            resourceDescription,
            resourcePrice,
            resourceStoreNumber,
            resourceFeatures
        }=this.props.resourceReleaseStore;
        return (
            <View>
                <View style={styles.productDescContainer}>
                    <Text style={styles.productDesc_text}>描述:</Text>
                    <AutoGrowingTextInput
                        placeholder='输入资源品述'
                        style={styles.productDesc_input}
                        multiline={true}
                        value={resourceDescription}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => resourceReleaseActions.setResourceDescription(text)}
                        keyboardType="default"
                        returnKeyType="done"
                        clearButtonMode="always"
                        keyboardAppearance="dark"
                        blurOnSubmit={true}
                        keyboardShouldPersistTaps={true}
                    />
                </View>
                <View style={styles.productDescContainer}>
                    <Text style={styles.productDesc_text}>价格:</Text>
                    <AutoGrowingTextInput
                        placeholder='输入资源价格'
                        style={styles.productDesc_input}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        value={resourcePrice}
                        onChangeText={(text) => resourceReleaseActions.setResourcePrice(text)}
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
                        value={resourceStoreNumber}
                        onChangeText={(text) => resourceReleaseActions.setResourceStoreNumber(text)}
                        keyboardType="numeric"
                        returnKeyType="done"
                        clearButtonMode="always"
                        keyboardAppearance="dark"
                        blurOnSubmit={true}
                        keyboardShouldPersistTaps={true}
                    />
                </View>
                {this._renderResourceFeatures()}
            </View>
        )
    }

    //渲染添加特征
    _renderResourceFeatures() {
        const {resourceReleaseActions}=this.props;
        const {resourceFeatures}=this.props.resourceReleaseStore;
        return (
            <View style={[styles.productDescContainer]}>
                <Text style={styles.productDesc_text}>特征:</Text>
                <TouchableOpacity style={styles.addOptions_btn}
                                  onPress={()=>resourceReleaseActions.showFeaturesModel(true)}>
                    <Text style={styles.addOptions_text}>添加+</Text>
                </TouchableOpacity>
                {
                    resourceFeatures.length > 0 ?
                        resourceFeatures.map((item, index)=> {
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
        )
    }

    //选择多张图片
    _selectImages(images) {
        const {resourceReleaseActions}=this.props;
        resourceReleaseActions.setResourceImages(images);
    }

    //发布资源
    _resourceRelease() {
        const {
            resourceName,
            resourceImages,
            resourceDescription,
            resourcePrice,
            resourceStoreNumber,
            resourceFeatures
        }=this.props.resourceReleaseStore;
        const {resourceReleaseActions}=this.props;
        resourceReleaseActions.requestResourceRelease(resourceImages, resourceName, resourceDescription, resourcePrice, resourceStoreNumber, resourceFeatures)
    }

    componentDidMount() {
        const {resourceReleaseActions}=this.props;

        //注意addListener的key和emit的key保持一致
        this.msgListener = DeviceEventEmitter.addListener('Msg', (option) => {
            resourceReleaseActions.setResourceFeatures(option)
        });
    }

    componentWillUnmount() {
        //此生命周期内，去掉监听
        this.msgListener && this.msgListener.remove();
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
