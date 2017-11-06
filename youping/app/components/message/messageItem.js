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

class messageItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var resource = this.props.resource;
        return (
            <TouchableOpacity style={styles.item} {...this.props} >

                <View style={styles.imageContainer}>
                    {
                        resource.user != null ?
                            <View>
                                <Image
                                    source={{uri: resource.user.avatar}}
                                    style={styles.image}
                                    defaultSource={require('../../img/loading.gif')}
                                />
                                <Text style={{textAlign: 'center', marginTop: 3}}>{resource.user.name}</Text>
                            </View>
                            : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}>资源名称:鱼肉</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.publisher_author}
                              numberOfLines={1}>{resource.text}</Text>
                        <Text style={styles.publisher_author}
                              numberOfLines={1}>{resource.messageTime}</Text>

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
        borderColor: 'gray',
        borderRadius: 40
    },
    contentContainer: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        marginTop: 6
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
    },
    buy: {
        color: "red",
        fontSize: 13
    },
    sell: {
        color: "blue",
        fontSize: 13
    }
});

export default messageItem
