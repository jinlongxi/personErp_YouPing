/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import BadgeView from '../common/badgeView';
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
        console.log(resource)
        return (
            <TouchableOpacity style={styles.item} {...this.props} >

                <View style={styles.imageContainer}>
                    {
                        resource.user != null ?
                            <BadgeView
                                title={resource.user.name}
                                padding={8}
                                badgeStyle={{flex: 1}}
                                badgeText={resource.badge}
                                renderImage={()=><Image style={styles.image} source={{uri: resource.user.avatar}}/>}
                            />
                            : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}
                              numberOfLines={1}>{resource.text}</Text>
                        <Text style={styles.date}
                              numberOfLines={1}>{resource.createdAt}</Text>
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
        margin: 15,
        justifyContent: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        marginTop: 6
    },
    text: {
        color: "#A1A1A1",
        fontSize: 16
    },
    date:{
        color: "#A4A4A4",
        fontSize: 14
    },
    badge: {
        backgroundColor: 'red',
        textAlign: 'right',
    }
});

export default messageItem
