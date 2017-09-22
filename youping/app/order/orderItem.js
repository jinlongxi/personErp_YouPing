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
        console.log(JSON.stringify(resource));

        return (
            <TouchableOpacity style={styles.item} {...this.props} >

                <View style={styles.imageContainer}>
                    {
                        resource.detailImageUrl != null ?
                            <Image
                                source={{uri: resource.detailImageUrl}}
                                style={styles.image}
                                defaultSource={require('../img/loading.gif')}
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
                              numberOfLines={1}>订单状态:{resource.statusId}</Text>
                        <Text style={styles.publisher_author}
                              numberOfLines={1}>单价:{resource.unitPrice}</Text>
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
        padding: 10,
        width: 300,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'gray'
    },
    contentContainer: {
        flex: 1,
        margin: 15
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    publisher_author: {
        color: "#A3A3A3",
        fontSize: 13
    },
    price: {
        color: '#2bb2a3',
        fontSize: 16
    },
    pages: {
        color: "#ff00ff",
        marginLeft: 10
    }

});

export default OrderItem
