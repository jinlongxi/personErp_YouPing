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
        const {resource} = this.props;
        return (
            resource.user != null ?
                <TouchableOpacity style={styles.item} {...this.props} >
                    <View style={styles.imageContainer}>
                        <BadgeView
                            title={resource.user.name}
                            padding={8}
                            badgeStyle={{flex: 1}}
                            badgeText={resource.badge}
                            renderImage={()=><Image style={styles.image} source={{uri: resource.user.avatar}}/>}
                        />
                    </View>


                    <View style={styles.contentContainer}>
                        <View style={styles.textContainer}>

                            <Text style={[styles.text, {color: 'blue'}]}
                                  numberOfLines={1}>{resource.user.name}</Text>
                            <Text style={styles.text}
                                  numberOfLines={1}>{resource.text}</Text>
                            <Text style={styles.date}
                                  numberOfLines={1}>{resource.createdAt}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                : null
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
        fontSize: 14
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
