/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Header from '../../containers/headerContainer';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import releaseProductImage from './releaseProductImage';
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
    Switch
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
            radioSelect: false
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
                    <View style={styles.productNameContainer}>
                        <Text style={styles.productName_text}>资源名称:</Text>
                        <AutoGrowingTextInput
                            placeholder='输入资源名称'
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
                        <Text style={styles.productDesc_text}>资源描述:</Text>
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
                                    <Text style={styles.productDesc_text}>资源价格:</Text>
                                    <AutoGrowingTextInput
                                        placeholder='价格'
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
                                    <Text style={styles.productDesc_text}>资源数量:</Text>
                                    <AutoGrowingTextInput
                                        placeholder='数量'
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
                            </View> : null
                    }

                </ScrollView>
                <TouchableOpacity onPress={()=> {
                    this._nextPage()
                }}
                                  style={styles.btnContainer}>
                    <Text style={styles.next_btn}>下一步</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //nextPage
    _nextPage() {
        if (this.state.productName == null || this.state.productDesc == null) {
            alert('信息不完整')
        } else {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'releaseProductImage',
                    component: releaseProductImage,
                    params: {
                        productName: this.state.productName,
                        productDesc: this.state.productDesc,
                        releaseResource: this.props.releaseResource,
                        showTabBar: this.props.showTabBar,
                        quantityTotal:this.state.quantityTotal,
                        productPrice:this.state.productPrice
                    },
                })
            }
        }
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
        color: '#4a4a4a',
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
        flexDirection: 'row'
    },
    radio_text: {
        fontSize: 16,
        textAlignVertical: 'center'
    },

});

export default ReleaseProduct
