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
        const {text}=this.props.resource;
        return (
            <TouchableOpacity style={styles.item} {...this.props} >
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, {color: 'blue'}]}
                              numberOfLines={1}>  {text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 80,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bbb',
        borderRadius: 2
    },
    textContainer: {
        justifyContent: 'center',
        marginTop: 6
    },
    text: {
        color: "#A1A1A1",
        fontSize: 16,
        paddingVertical: 3
    },
    date: {
        color: "#A4A4A4",
        fontSize: 12
    },
    badge: {
        backgroundColor: 'red',
        textAlign: 'right',
    }
});

export default messageItem
