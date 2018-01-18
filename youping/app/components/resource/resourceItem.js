/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Swipeout from 'react-native-swipeout';
import Util from '../../utils/util';
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

class myResourceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    //删除资源
    _deleteReource(productId) {
        this.props.salesDiscontinuation(productId)
    }

    render() {
        var resource = this.props.resource;
        // Buttons
        var swipeoutBtns = [
            {
                text: '下架',
                backgroundColor: 'red',
                onPress: this._deleteReource.bind(this, resource.productId)
            },
            {
                text: '屏蔽',
                backgroundColor: 'blue',
            }

        ];
        return (
            <Swipeout right={swipeoutBtns} autoClose={true} style={{backgroundColor: 'white'}}>
                <TouchableOpacity style={styles.item} {...this.props} >
                    <View style={styles.imageContainer}>
                        {
                            resource.detailImageUrl != null ?
                                <Image
                                    source={{uri: resource.detailImageUrl + '?x-oss-process=image/resize,w_100,h_100/quality,q_50'}}
                                    style={styles.image}
                                    defaultSource={require('../../img/loading.gif')}
                                />
                                : null
                        }
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.textContainer}>
                            <Text numberOfLines={1} style={styles.resourceTitle}>资源名称:{resource.productName}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{color: '#FA8072'}}>潜在客户:({resource.placingCustCount}) </Text>
                            <Text style={{color: '#B03060'}}>实际客户:({resource.custCount}) </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{color: '#698B22'}}>转发:({resource.partnerCount}) </Text>
                            <Text style={{color: '#8470FF'}}>浏览:({resource.visitorCount}) </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: Util.windowSize.width
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
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
    },
    resourceTitle: {
        fontSize: 18,
        color: '#1d1d1d',
    },
    publisher_author: {
        color: "#A3A3A3",
        fontSize: 13
    },
    price: {
        color: '#2bb2a3',
        fontSize: 16,
    },
    pages: {
        color: "#ff00ff",
        marginLeft: 10
    }
});

export default myResourceItem
