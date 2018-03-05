/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
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

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var resource = this.props.resource;
        return (
            <TouchableOpacity style={styles.item} {...this.props} >
                <View style={styles.imageContainer}>
                    {
                        resource.detailImageUrl != null ?
                            <Image
                                source={{uri: resource.detailImageUrl + '?x-oss-process=image/resize,w_100,h_100/quality,q_80'}}
                                style={styles.image}
                                defaultSource={require('../../img/loading.gif')}
                            />
                            : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}
                              style={styles.productName}>资源名称:{resource.productName}({resource.orderId})</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{color: resource.orderPayStatus.includes('未') ? '#D2691E' : '#8B8989'}}
                              numberOfLines={1}>支付状态:{resource.orderPayStatus}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{color: resource.orderShipment.includes('未') ? '#D2691E' : '#8B8989'}}
                              numberOfLines={1}>发货状态:{resource.orderShipment}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.buy}
                              numberOfLines={1}>购买人:{resource.personInfoMap.firstName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        borderRadius: 2
    },
    contentContainer: {
        flex: 2,
        marginLeft: 15,
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 2
    },
    productName: {
        fontSize: 16,
        color: '#8B8989',
    },
    publisher_author: {
        color: "#8B8989",
    },
    buy: {
        color: "#8DB6CD",
        fontSize: 13
    },
});
//#D2691E
export default OrderItem
