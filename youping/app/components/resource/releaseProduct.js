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
            productPrice: null,
            show: true
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
        if (this.state.productName == null || this.state.productDesc==null) {
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
                        releaseResource:this.props.releaseResource,
                        showTabBar:this.props.showTabBar,
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
    productDescContainer: {},
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
    }

});

export default ReleaseProduct
