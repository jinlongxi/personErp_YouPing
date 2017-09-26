/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ReleaseResource from '../resource/releaseResource';
import OrderList from '../order/orderList';
import ContactList from '../contacts/contactList'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    AsyncStorage
} from 'react-native';


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productCategoryId: null
        };
        this._releseResource = this._releseResource.bind(this);
        this._queryMyResourceOrder = this._queryMyResourceOrder.bind(this);
        this._enterContactList = this._enterContactList.bind(this);
    }

    //发布资源
    _releseResource() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ReleaseResource',
                component: ReleaseResource,
                params: {},
            })
        }
    }

    //我的联系人
    _enterContactList() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ContactList',
                component: ContactList,
                params: {},
            })
        }
    }

    //查询我的订单
    _queryMyResourceOrder() {
        // const {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: 'OrderList',
        //         component: OrderList,
        //         params: {
        //             productCategoryId: this.props.productCategoryId
        //         },
        //     })
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageIcon} onPress={this._queryMyResourceOrder}>
                    <Image
                        source={require('../img/home/notification.png')}
                        style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._releseResource}>
                    <Image
                        source={require('../img/home/create.png')}
                        style={styles.icon}

                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageIcon} onPress={this._enterContactList}>
                    <Image
                        source={require('../img/home/contacts.png')}
                        style={styles.icon}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageIcon: {
        margin: 10,
    },
    icon: {
        width: 50,
        height: 50
    }
});

export default NavigationBar
