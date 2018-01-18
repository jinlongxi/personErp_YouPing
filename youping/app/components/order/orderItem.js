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
                        <Text numberOfLines={1}>资源名称:{resource.productName}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.publisher_author}
                              numberOfLines={1}>订单({resource.orderId}):{resource.statusId}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.publisher_author}
                              numberOfLines={1}>支付状态:{resource.orderPayStatus}</Text>
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
        borderWidth: 1,
        borderColor: 'gray',
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
    publisher_author: {
        color: "#D2691E",
    },
    buy: {
        color: "red",
        fontSize: 13
    },
});

export default OrderItem
