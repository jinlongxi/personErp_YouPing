/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Util from '../../utils/util';
import PaymentMethods from './PaymentMethods';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';

class AccountList extends Component {
    constructor(props) {
        super(props);
        this._paymentMethod = this._paymentMethod.bind(this);
    }

    //收款方式
    _paymentMethod() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'PaymentMethods',
                component: PaymentMethods,
                params: {
                    PaymentMethods: this.props.PaymentMethods,
                    aboutState: this.props.aboutState
                },
            })
        }
    }

    render() {
        const aboutState = this.props.aboutState;
        return (
            aboutState.isLoading ?
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.accountInfo}>
                            <View style={styles.image}>
                                <Image source={{uri: aboutState.myInfo.headPortrait}}
                                       style={styles.image1}
                                       accessibilityLabel="图片加载中。。。"
                                       blurRadius={1}
                                       defaultSource={require('../../img/loading.gif')}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>姓名:{aboutState.myInfo.personName}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>电话:{aboutState.myInfo.contactNumber}</Text>
                            </View>
                            {/*<TouchableOpacity style={styles.PaymentMethods} onPress={()=> {*/}
                                {/*this._paymentMethod()*/}
                            {/*}*/}
                            {/*}>*/}
                                {/*<Text style={styles.text}>收款方式</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity style={styles.loginOut} onPress={()=> {
                                this.props.loginOut()
                            }
                            }>
                                <Text style={styles.text}>退出登录</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                : Util.loading
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop:20,
    },
    accountInfo: {
        justifyContent: 'center',
    },
    image: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        height: 150,
        width: 150,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        borderRadius: 75
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    text: {
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40
    },
    //退出登录
    loginOut: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EE6A50',
        margin: 20
    },
    loginOutText: {
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 18,
        lineHeight: 40,
        color: '#f0f0f0'
    },
    //收款方式
    PaymentMethods: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD39B',
        margin: 20
    }
});

export default AccountList
