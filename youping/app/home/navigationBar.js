/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ReleaseResource from '../release/releaseResource'
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
        this.state={
            productCategoryId:this.props.productCategoryId
        };
        this._releseResource = this._releseResource.bind(this)
    }

    //发布资源
    _releseResource() {
        console.log(this.props.productCategoryId+"llllllllllll")
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ReleaseResource',
                component: ReleaseResource,
                params: {
                    productCategoryId:this.props.productCategoryId
                }
            })
        }
    }

    render() {
        var productCategoryId=this.props.productCategoryId;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageIcon}>
                    <Image
                        source={require('../img/home/manager.png')}
                        style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._releseResource}>
                    <Image
                        source={require('../img/home/create.png')}
                        style={styles.icon}

                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageIcon}>
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
