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

class FuzzyItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        return (
            <TouchableOpacity style={styles.responseList} {...this.props}>
                <Text>{data.productName}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    /*start 搜索后列表的样式*/
    responseList: {
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    responseList_text: {
        color: 'red',
        fontSize: 16
    }
    /*end 搜索后列表的样式*/
});

export default FuzzyItem
