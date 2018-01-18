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
        let resource = this.props.resource;
        let workerList = '';
        resource.distributingLeafletsList.map((item)=> {
            workerList += item.workerName + ',';
        });

        let text;
        if (resource.text.search("https://") !== -1 || resource.text.search("<button") !== -1) {
            text = '图片消息'
        } else if (resource.text.search("latitude") !== -1) {
            text = '位置消息'
        } else {
            text = resource.text
        }
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
                        <Text style={[styles.text,{color:'blue'}]}
                              numberOfLines={1}>{resource.user.name}</Text>
                        <Text style={styles.text}
                              numberOfLines={1}>{text}</Text>
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
        borderWidth: 1,
        borderColor: 'gray',
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
