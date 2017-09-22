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

class ContactItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var resource = this.props.resource;
        return (
            <TouchableOpacity style={styles.item} {...this.props} >

                <View style={styles.imageContainer}>
                    {
                        resource.headPortrait != null ?
                            <Image
                                source={{uri: resource.headPortrait}}
                                style={styles.image}
                                defaultSource={require('../img/loading.gif')}
                            />
                            : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}>姓名:{resource.firstName}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}>关系类型:{resource.partyRelationshipTypeId}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}>PartyId:{resource.partyIdTo}</Text>
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
        borderRadius:40,
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

export default ContactItem;
